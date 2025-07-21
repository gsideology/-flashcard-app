import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DecksPage from "./pages/DecksPage";
import StudyPage from "./pages/StudyPage";

function App() {
  return (
    <Router>
      <nav className="flex gap-4 p-4 bg-blue-100 mb-4">
        <Link to="/" className="font-bold text-blue-700 hover:underline">
          Decks
        </Link>
        <Link to="/study" className="font-bold text-blue-700 hover:underline">
          Study
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<DecksPage />} />
        <Route path="/study" element={<StudyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
