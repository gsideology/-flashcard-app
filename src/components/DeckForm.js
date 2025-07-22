import React, { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export default function DeckForm() {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    await addDoc(collection(db, "users", currentUser.uid, "decks"), {
      name: name.trim(),
      createdAt: new Date(),
    });
    setName("");
    setLoading(false);
    window.location.reload(); // simple reload to update list
  }

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        className="flex-1 border rounded-l px-2 py-1"
        type="text"
        placeholder="New deck name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />
      <button
        className="bg-blue-500 text-white px-4 py-1 rounded-r disabled:opacity-50"
        type="submit"
        disabled={loading}
      >
        Add
      </button>
    </form>
  );
}
