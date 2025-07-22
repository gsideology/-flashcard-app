import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DecksPage from "./pages/DecksPage";
import StudyPage from "./pages/StudyPage";
import AuthForm from "./components/AuthForm";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

function AppContent() {
  const { currentUser, signout } = useAuth();
  if (!currentUser) return <AuthForm />;
  return (
    <Router>
      <nav className="flex gap-4 p-4 bg-blue-100 mb-4 items-center justify-between">
        <div className="flex gap-4">
          <Link to="/" className="font-bold text-blue-700 hover:underline">
            Decks
          </Link>
          <Link to="/study" className="font-bold text-blue-700 hover:underline">
            Study
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">{currentUser.email}</span>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
            onClick={signout}
          >
            Sign Out
          </button>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<DecksPage />} />
        <Route path="/study" element={<StudyPage />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
