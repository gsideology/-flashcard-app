import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import StudySession from "../components/StudySession";
import { useAuth } from "../contexts/AuthContext";

export default function StudyPage() {
  const { currentUser } = useAuth();
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);

  useEffect(() => {
    async function fetchDecks() {
      const decksRef = collection(db, "users", currentUser.uid, "decks");
      const snapshot = await getDocs(decksRef);
      setDecks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }
    fetchDecks();
  }, [currentUser]);

  if (selectedDeck) {
    return (
      <StudySession
        deckId={selectedDeck.id}
        userId={currentUser.uid}
        deckName={selectedDeck.name}
      />
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Start a Study Session</h1>
      <ul className="space-y-2">
        {decks.map((deck) => (
          <li key={deck.id}>
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded p-3 text-left shadow"
              onClick={() => setSelectedDeck(deck)}
            >
              {deck.name}
            </button>
          </li>
        ))}
        {decks.length === 0 && (
          <li className="text-gray-400">
            No decks available. Create a deck first.
          </li>
        )}
      </ul>
    </div>
  );
}
