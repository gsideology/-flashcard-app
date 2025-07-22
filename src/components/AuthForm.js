import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function AuthForm() {
  const { signup, signin } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isSignup) {
        await signup(email, password);
      } else {
        await signin(email, password);
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-xs mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">
        {isSignup ? "Sign Up" : "Sign In"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          className="border rounded px-2 py-1"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          className="border rounded px-2 py-1"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 mt-2 disabled:opacity-50"
          disabled={loading}
        >
          {loading
            ? isSignup
              ? "Signing up..."
              : "Signing in..."
            : isSignup
            ? "Sign Up"
            : "Sign In"}
        </button>
      </form>
      <div className="text-center mt-3 text-sm">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => setIsSignup(false)}
              disabled={loading}
            >
              Sign In
            </button>
          </>
        ) : (
          <>
            Need an account?{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => setIsSignup(true)}
              disabled={loading}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}
