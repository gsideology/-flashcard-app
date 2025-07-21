import React, { useState } from "react";

export default function Flashcard({ card, onRate }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="mb-4">
      <div
        className={`w-full h-40 flex items-center justify-center bg-white rounded shadow text-2xl font-bold cursor-pointer transition-transform duration-300 ${
          flipped ? "rotate-y-180" : ""
        }`}
        style={{ perspective: 1000 }}
        onClick={() => setFlipped(true)}
      >
        {flipped ? card.back : card.front}
      </div>
      {flipped && (
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => onRate("again")}
          >
            Again
          </button>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
            onClick={() => onRate("good")}
          >
            Good
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => onRate("easy")}
          >
            Easy
          </button>
        </div>
      )}
      {!flipped && (
        <div className="text-center text-gray-400 mt-2 text-sm">
          Click card to flip
        </div>
      )}
    </div>
  );
}
