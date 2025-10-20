import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ResultCard from "../components/ResultCard";
import { useState } from "react";
import { getGeminiResponse } from "../services/geminiAPI";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { savePitchToFirestore } from "../services/firebase";

export default function Dashboard() {
  const [showTextBox, setShowTextBox] = useState(false);
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setOutput("");

    try {
      const response = await getGeminiResponse(text);
      setOutput(response);
      
      const userId = auth.currentUser?.uid;
      if (userId) {
        await savePitchToFirestore(userId, text, response);
      }
      
    } catch (error) {
      console.error("Gemini API error:", error);
      setOutput("⚠️ Failed to generate response. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePitch = () => {
    navigate('/text');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Sidebar - Mobile: conditional, Desktop: visible */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Mobile Sidebar - Hamburger click par show hoga */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
          {/* Overlay click par sidebar band ho jayega */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        </div>
      )}

      {/* Main content area - Mobile: full width, Desktop: with margin */}
      <div className="flex flex-col flex-1 md:ml-64 relative z-10">
        {/* Navbar with hamburger function */}
        <div className="sticky top-0 z-20">
          <Navbar onMenuToggle={setIsSidebarOpen} />
        </div>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 md:p-8 pt-20 md:pt-24 overflow-y-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-400 mb-6">
            Welcome back, <span className="text-white">Umer!</span>
          </h1>

          {/* New Idea Section */}
          <div className="mb-6 md:mb-10 bg-gray-800/70 border border-gray-700 rounded-xl md:rounded-2xl p-4 md:p-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-200">
              Have a new startup idea?
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCreatePitch}
                className="px-4 md:px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold transition shadow-lg"
              >
                Go to Text Editor
              </button>
            </div>
          </div>

          {/* Show text input & output here */}
          {showTextBox && (
            <div className="mb-6 md:mb-10 bg-gray-800/70 border border-gray-700 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl backdrop-blur-lg">
              <h2 className="text-xl md:text-2xl font-bold text-indigo-400 mb-4 md:mb-6">
                Write or paste your text below
              </h2>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing your pitch, script, or idea..."
                className="w-full h-32 md:h-40 bg-transparent outline-none text-gray-100 resize-none placeholder-gray-500 border border-gray-600 rounded-lg p-3"
              ></textarea>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="mt-4 w-full md:w-auto px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition-all shadow-lg hover:shadow-indigo-700/30 disabled:opacity-60"
              >
                {loading ? "Generating..." : "Generate Result"}
              </button>

              {/* Output box */}
              {output && (
                <div className="mt-6 bg-gray-800/80 border border-gray-700 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-indigo-400 mb-3">
                    Output:
                  </h3>
                  <p
                    className={`whitespace-pre-line ${
                      output.includes("⚠️ Failed")
                        ? "text-red-400"
                        : "text-gray-200"
                    }`}
                  >
                    {output}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Old result cards (stay below) */}
          {!showTextBox && (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <ResultCard
                title="AI Startup Idea"
                description="Generated with advanced AI prompts and refined branding strategy."
                tag="AI Pitch"
              />
              <ResultCard
                title="Marketing Copy"
                description="Catchy ad copy designed for your new product launch."
                tag="Marketing"
              />
              <ResultCard
                title="Investor Summary"
                description="Short, effective summary to pitch investors with clear goals."
                tag="Business"
              />
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
