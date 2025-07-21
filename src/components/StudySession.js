import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import Flashcard from "./Flashcard";
import { calculateNextReview } from "../utils/srs";

export default function StudySession({ deckId, userId, deckName }) {
  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCards() {
      setLoading(true);
      const cardsRef = collection(
        db,
        "users",
        userId,
        "decks",
        deckId,
        "cards"
      );
      const snapshot = await getDocs(cardsRef);
      // For now, study all cards. Later, filter by nextReviewDate.
      setCards(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }
    fetchCards();
  }, [deckId, userId]);

  async function handleRate(rating) {
    const card = cards[current];
    // SRS logic: update interval, easeFactor, nextReviewDate
    const { interval = 1, easeFactor = 2.5, nextReviewDate } = card;
    const updated = calculateNextReview({ interval, easeFactor, rating });
    await updateDoc(
      doc(db, "users", userId, "decks", deckId, "cards", card.id),
      updated
    );
    if (current + 1 < cards.length) {
      setCurrent(current + 1);
    } else {
      setDone(true);
    }
  }

  if (loading)
    return (
      <div className="text-center text-gray-400 py-8 animate-pulse">
        Loading cards...
      </div>
    );
  if (done || cards.length === 0)
    return (
      <div className="text-center text-green-600 py-8">Session complete!</div>
    );

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">{deckName}</h2>
      <div className="mb-2 text-gray-500">
        Card {current + 1} of {cards.length}
      </div>
      <Flashcard card={cards[current]} onRate={handleRate} />
    </div>
  );
}
