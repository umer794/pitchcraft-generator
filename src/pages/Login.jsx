// // src/pages/Login.jsx
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../services/firebase";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (!email.trim()) return setError("Please enter your email.");
//     if (!password) return setError("Please enter your password.");
//     setLoading(true);

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Login error:", err);
//       if (err.code === "auth/wrong-password") setError("Wrong password. Try again.");
//       else if (err.code === "auth/user-not-found") setError("No account found with this email.");
//       else setError(err.message || "Login failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-gray-800 text-gray-100 p-6">
//       <div className="max-w-md w-full bg-gradient-to-br from-gray-900/40 to-gray-800/40 border border-gray-700 rounded-2xl p-8 shadow-2xl">
//         <div className="mb-6 text-center">
//           <h1 className="text-2xl font-bold text-indigo-300">Welcome Back</h1>
//           <p className="text-sm text-gray-400">Login to access your PitchCraft dashboard</p>
//         </div>

//         {error && <div className="mb-4 text-sm text-red-400 bg-red-900/30 p-3 rounded">{error}</div>}

//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="text-sm text-gray-300">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="you@example.com"
//               className="mt-2 w-full rounded-lg bg-gray-800 border border-gray-700 p-3 text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-300">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Your password"
//               className="mt-2 w-full rounded-lg bg-gray-800 border border-gray-700 p-3 text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-60"
//           >
//             {loading ? "Logging in..." : "Log in"}
//           </button>
//         </form>

//         <div className="mt-5 flex items-center justify-between text-sm text-gray-400">
//           <Link to="/signup" className="text-indigo-300 hover:underline">Create account</Link>
//           <button
//             onClick={() => alert("Forgot password flow: implement password reset via Firebase sendPasswordResetEmail")}
//             className="text-gray-400 hover:text-indigo-300"
//           >
//             Forgot?
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgetLoading, setForgetLoading] = useState(false);
  const [showForget, setShowForget] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) return setError("Please enter your email.");
    if (!password) return setError("Please enter your password.");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      if (err.code === "auth/wrong-password") setError("Wrong password. Try again.");
      else if (err.code === "auth/user-not-found") setError("No account found with this email.");
      else setError(err.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgetPassword = async () => {
    if (!email.trim()) return setError("Please enter your email first.");
    
    setForgetLoading(true);
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setError("✅ Password reset email sent! Check your inbox.");
      setShowForget(false);
    } catch (err) {
      console.error("Forget password error:", err);
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else {
        setError(err.message || "Failed to send reset email.");
      }
    } finally {
      setForgetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-gray-800 text-gray-100 p-6">
      <div className="max-w-md w-full bg-gradient-to-br from-gray-900/40 to-gray-800/40 border border-gray-700 rounded-2xl p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-indigo-300">Welcome Back</h1>
          <p className="text-sm text-gray-400">Login to access your PitchCraft dashboard</p>
        </div>

        {error && (
          <div className={`mb-4 text-sm p-3 rounded ${
            error.includes("✅") 
              ? "text-green-400 bg-green-900/30" 
              : "text-red-400 bg-red-900/30"
          }`}>
            {error}
          </div>
        )}

        {!showForget ? (
          // Login Form
          <form onSubmit={handleLogin} className="space-y-4">
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
                placeholder="Your password"
                className="mt-2 w-full rounded-lg bg-gray-800 border border-gray-700 p-3 text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
        ) : (
          // Forget Password Form
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-300">Enter your email to reset password</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-lg bg-gray-800 border border-gray-700 p-3 text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              onClick={handleForgetPassword}
              disabled={forgetLoading}
              className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition disabled:opacity-60"
            >
              {forgetLoading ? "Sending..." : "Send Reset Link"}
            </button>

            <button
              onClick={() => setShowForget(false)}
              className="w-full py-3 rounded-xl bg-gray-600 hover:bg-gray-700 text-white font-semibold transition"
            >
              Back to Login
            </button>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between text-sm text-gray-400">
          <Link to="/signup" className="text-indigo-300 hover:underline">Create account</Link>
          
          {!showForget && (
            <button
              onClick={() => setShowForget(true)}
              className="text-gray-400 hover:text-indigo-300"
            >
              Forgot Password?
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


