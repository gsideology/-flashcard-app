import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Deck from "./Deck";

const TEST_USER_ID = "test-user";

export default function DeckList() {
  const [decks, setDecks] = useState([]);
  const [cardCounts, setCardCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDecks() {
      setLoading(true);
      const decksRef = collection(db, "users", TEST_USER_ID, "decks");
      const snapshot = await getDocs(decksRef);
      const decksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDecks(decksData);
      // Fetch card counts for each deck
      const counts = {};
      for (const deck of decksData) {
        const cardsRef = collection(
          db,
          "users",
          TEST_USER_ID,
          "decks",
          deck.id,
          "cards"
        );
        const cardsSnap = await getDocs(cardsRef);
        counts[deck.id] = cardsSnap.size;
      }
      setCardCounts(counts);
      setLoading(false);
    }
    fetchDecks();
  }, []);

  async function handleDelete(deckId) {
    await deleteDoc(doc(db, "users", TEST_USER_ID, "decks", deckId));
    setDecks((decks) => decks.filter((deck) => deck.id !== deckId));
  }

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-8 animate-pulse">
        Loading decks...
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {decks.map((deck) => (
        <li key={deck.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-lg">{deck.name}</span>
            <span className="text-xs text-gray-500 bg-gray-100 rounded px-2 py-0.5">
              {cardCounts[deck.id] || 0} cards
            </span>
            <button
              onClick={() => handleDelete(deck.id)}
              className="ml-4 text-red-500 hover:underline text-sm"
            >
              Delete
            </button>
          </div>
          <Deck deck={deck} userId={TEST_USER_ID} />
        </li>
      ))}
      {decks.length === 0 && (
        <li className="text-center text-gray-400 py-8">
          No decks yet. Create your first deck above!
        </li>
      )}
    </ul>
  );
}
