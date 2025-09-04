import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizContext } from "../context/QuizContext";

const Results = () => {
  const navigate = useNavigate();
  const { questions, selectedAnswers, score, resetQuiz, totalQuestions } =
    useQuizContext();

  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
  const isPassing = percentage >= 70;

  const handleRestart = () => {
    resetQuiz();
    navigate("/quiz");
  };

  const handleBackToHome = () => {
    resetQuiz();
    navigate("/");
  };

  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  // ✅ Redirect safely in useEffect
  useEffect(() => {
    if (questions.length === 0) {
      navigate("/");
    }
  }, [questions, navigate]);

  // Prevent rendering until redirect decision is made
  if (questions.length === 0) return null;

  return (
    <div className="min-h-[100vh] bg-gradient-to-br from-[#eef2ff] to-[#faf5ff] py-8 px-4">
      <div className="max-w-[64rem] mx-auto">
        <div className="bg-white rounded-[1rem] shadow-xl p-8 animate-fade-in">
          {/* Score Summary */}
          <div className="text-center mb-8">
            <h1 className="text-[2.5rem] font-bold text-[#111827] mb-4">
              Quiz Complete!
            </h1>

            <div className="relative w-48 h-48 mx-auto mb-6">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-[#e5e7eb]"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 88 * (1 - percentage / 100)
                  }`}
                  className={`transition-all duration-1000 ${
                    isPassing ? "text-[#22c55e]" : "text-[#ef4444]"
                  }`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[3rem] font-bold text-[#111827]">
                  {score}
                </span>
                <span className="text-[1.25rem] text-[#4b5563]">
                  out of {totalQuestions}
                </span>
              </div>
            </div>

            <div
              className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-medium ${
                isPassing
                  ? "bg-[#dcfce7] text-[#166534]"
                  : "bg-[#fee2e2] text-[#991b1b]"
              }`}
            >
              {isPassing ? "🎉 Great job!" : "📚 Keep practicing!"}
            </div>
          </div>

          {/* Detailed Results */}
          <div className="mb-8">
            <h2 className="text-[1.5rem] font-bold text-[#111827] mb-4">
              Review Your Answers
            </h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <div
                    key={question.id}
                    className={`p-6 rounded-lg border-2 ${
                      isCorrect
                        ? "border-[#bbf7d0] bg-[#f0fdf4]"
                        : userAnswer
                        ? "border-[#fecaca] bg-[#fef2f2]"
                        : "border-[#e5e7eb] bg-[#f9fafb]"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-[#111827] flex-1">
                        {index + 1}. {decodeHTML(question.question)}
                      </h3>
                      <span
                        className={`ml-4 flex-shrink-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          isCorrect
                            ? "bg-[#bbf7d0] text-[#166534]"
                            : userAnswer
                            ? "bg-[#fecaca] text-[#991b1b]"
                            : "bg-[#e5e7eb] text-[#6b7280]"
                        }`}
                      >
                        {isCorrect
                          ? "✓ Correct"
                          : userAnswer
                          ? "✗ Incorrect"
                          : "— Skipped"}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {userAnswer ? (
                        !isCorrect && (
                          <div className="flex items-center text-[#b91c1c]">
                            <span className="font-medium mr-2">
                              Your answer:
                            </span>
                            <span>{decodeHTML(userAnswer)}</span>
                          </div>
                        )
                      ) : (
                        <div className="flex items-center text-[#6b7280]">
                          <span className="font-medium mr-2">Your answer:</span>
                          <span>No answer selected</span>
                        </div>
                      )}
                      <div className="flex items-center text-[#15803d]">
                        <span className="font-medium mr-2">
                          Correct answer:
                        </span>
                        <span>{decodeHTML(question.correctAnswer)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button onClick={handleRestart} className="btn-primary">
              Try Again
            </button>
            <button onClick={handleBackToHome} className="btn-secondary">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
