import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    questionCount: 10,
    useAPI: false,
    difficulty: "any",
  });

  const handleStartQuiz = () => {
    sessionStorage.setItem("quizSettings", JSON.stringify(settings));
    navigate("/quiz");
  };

  return (
    <div className="min-h-[100vh] bg-gradient-to-br from-[#eef2ff] to-[#faf5ff] flex items-center justify-center px-4">
      <div className="max-w-[28rem] w-full">
        <div className="bg-white rounded-[1rem] shadow-xl p-8 text-center animate-fade-in">
          {/* Header */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-[#6366f1] to-[#9333ea] rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <h1 className="text-[2.5rem] font-bold text-[#111827] mb-2">
              Quiz Master
            </h1>
            <p className="text-[#4b5563]">
              Test your knowledge with our interactive quiz!
            </p>
          </div>

          {/* Default Home View */}
          {!showSettings && (
            <>
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 bg-[#f9fafb] rounded-lg">
                  <span className="text-[#374151]">Questions</span>
                  <span className="font-semibold text-[#111827]">
                    {settings.questionCount}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#f9fafb] rounded-lg">
                  <span className="text-[#374151]">Time per question</span>
                  <span className="font-semibold text-[#111827]">
                    30 seconds
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#f9fafb] rounded-lg">
                  <span className="text-[#374151]">Passing score</span>
                  <span className="font-semibold text-[#111827]">70%</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleStartQuiz}
                  className="btn-primary w-full"
                >
                  Start Quiz
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="w-full text-[#4f46e5] hover:text-[#4338ca] font-medium py-2 transition-colors"
                >
                  Customize Settings
                </button>
              </div>
            </>
          )}

          {showSettings && (
            <>
              <div className="space-y-4 mb-8">
                <div className="text-left">
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Number of Questions
                  </label>
                  <select
                    value={settings.questionCount}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        questionCount: parseInt(e.target.value),
                      })
                    }
                    className="w-full p-3 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
                  >
                    <option value="5">5 Questions</option>
                    <option value="10">10 Questions</option>
                    <option value="15">15 Questions</option>
                    <option value="20">20 Questions</option>
                  </select>
                </div>

                <div className="text-left">
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Question Source
                  </label>
                  <select
                    value={settings.useAPI ? "api" : "local"}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        useAPI: e.target.value === "api",
                      })
                    }
                    className="w-full p-3 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
                  >
                    <option value="local">Local Questions</option>
                    <option value="api">Online Questions (API)</option>
                  </select>
                </div>

                <div className="text-left">
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={settings.difficulty}
                    onChange={(e) =>
                      setSettings({ ...settings, difficulty: e.target.value })
                    }
                    className="w-full p-3 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
                  >
                    <option value="any">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleStartQuiz}
                  className="btn-primary w-full"
                >
                  Start Quiz
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="btn-secondary w-full"
                >
                  Back
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
