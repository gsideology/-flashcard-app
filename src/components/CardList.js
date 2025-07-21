import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function CardList({ deckId, userId = "test-user" }) {
  const [cards, setCards] = useState([]);
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
      setCards(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }
    fetchCards();
  }, [deckId, userId]);

  async function handleDelete(cardId) {
    await deleteDoc(doc(db, "users", userId, "decks", deckId, "cards", cardId));
    setCards((cards) => cards.filter((card) => card.id !== cardId));
  }

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-4 animate-pulse">
        Loading cards...
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {cards.map((card) => (
        <li
          key={card.id}
          className="flex items-center justify-between bg-blue-50 rounded shadow-sm p-2"
        >
          <span>
            <span className="font-semibold text-blue-700">{card.front}</span>:{" "}
            <span className="text-gray-700">{card.back}</span>
          </span>
          <button
            onClick={() => handleDelete(card.id)}
            className="text-red-400 hover:text-red-600 text-xs"
          >
            Delete
          </button>
        </li>
      ))}
      {cards.length === 0 && (
        <li className="text-center text-gray-400 py-4">
          No cards yet. Add your first card above!
        </li>
      )}
    </ul>
  );
}
