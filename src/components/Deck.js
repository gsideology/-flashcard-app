import React, { useState } from "react";
import CardList from "./CardList";
import CardForm from "./CardForm";

export default function Deck({ deck, userId }) {
  const [showCards, setShowCards] = useState(false);

  return (
    <div className="mb-2">
      <div className="flex items-center justify-between bg-gray-100 rounded p-2">
        <span className="font-semibold">{deck.name}</span>
        <button
          className="text-blue-500 hover:underline text-sm"
          onClick={() => setShowCards((v) => !v)}
        >
          {showCards ? "Hide Cards" : "View Cards"}
        </button>
      </div>
      {showCards && (
        <div className="ml-2 mt-2 border-l-4 border-blue-200 bg-blue-50 rounded p-2">
          <CardForm deckId={deck.id} userId={userId} />
          <CardList deckId={deck.id} userId={userId} />
        </div>
      )}
    </div>
  );
}
