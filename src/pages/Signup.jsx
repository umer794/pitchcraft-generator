// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../services/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) return setError("Please enter your name.");
    if (!email.trim()) return setError("Please enter your email.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (!agree) return setError("Please agree to the terms.");

    setLoading(true);
    try {
      // Create auth user
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // Optionally set displayName in Firebase Auth
      await updateProfile(user, { displayName: name });

      // Save user document in Firestore
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        name,
        email,
        createdAt: serverTimestamp(),
      });

      // --- Success: log and redirect to login (not dashboard) ---
      console.log("Signup successful for:", user.uid);
      navigate("/login"); // <--- changed to go to login page

    } catch (err) {
      console.error("Signup error:", err);
      // Friendly messages for common errors
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Try logging in.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else {
        setError(err.message || "Signup failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-gray-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-gray-850/60 backdrop-blur-md border border-gray-700 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-indigo-400 mb-2">Create your PitchCraft account</h2>
        <p className="text-sm text-gray-400 mb-6">
          Sign up to save your AI-generated startup pitches and access the dashboard.
        </p>

        {error && <div className="mb-4 text-sm text-red-400 bg-red-900/30 p-3 rounded">{error}</div>}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-sm text-gray-300">Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="mt-2 w-full rounded-lg bg-gray-800 border border-gray-700 p-3 text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full rounded-lg bg-gray-800 border border-gray-700 p-3 text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="mt-2 w-full rounded-lg bg-gray-800 border border-gray-700 p-3 text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              id="agree"
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="h-4 w-4 rounded bg-gray-700 text-indigo-500"
            />
            <label htmlFor="agree" className="text-sm text-gray-400">I agree to the Terms & Privacy</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-300 hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  );
}
