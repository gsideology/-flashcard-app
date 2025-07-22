import React, { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export default function CardForm({ deckId, userId }) {
  const { currentUser } = useAuth();
  const actualUserId = userId || currentUser.uid;
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!front.trim() || !back.trim()) return;
    setLoading(true);
    await addDoc(
      collection(db, "users", actualUserId, "decks", deckId, "cards"),
      {
        front: front.trim(),
        back: back.trim(),
        createdAt: new Date(),
      }
    );
    setFront("");
    setBack("");
    setLoading(false);
    window.location.reload(); // simple reload to update list
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-2">
      <input
        className="flex-1 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        type="text"
        placeholder="Front"
        value={front}
        onChange={(e) => setFront(e.target.value)}
        disabled={loading}
      />
      <input
        className="flex-1 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        type="text"
        placeholder="Back"
        value={back}
        onChange={(e) => setBack(e.target.value)}
        disabled={loading}
      />
      <button
        className="bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-300 text-white px-3 py-1 rounded transition disabled:opacity-50"
        type="submit"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
