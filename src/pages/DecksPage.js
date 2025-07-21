import React from "react";
import DeckList from "../components/DeckList";
import DeckForm from "../components/DeckForm";

export default function DecksPage() {
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Decks</h1>
      <DeckForm />
      <DeckList />
    </div>
  );
}
