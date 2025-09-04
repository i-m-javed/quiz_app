import React from "react";

const Question = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  questionNumber,
}) => {
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#e0e7ff] text-[#3730a3]">
            {question.category}
          </span>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              question.difficulty === "easy"
                ? "bg-[#dcfce7] text-[#166534]"
                : question.difficulty === "medium"
                ? "bg-[#fef3c7] text-[#92400e]"
                : "bg-[#fee2e2] text-[#991b1b]"
            }`}
          >
            {question.difficulty}
          </span>
        </div>

        <h2 className="text-[1.5rem] font-bold text-[#111827] leading-tight">
          {decodeHTML(question.question)}
        </h2>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(option)}
            className={`option-button ${
              selectedAnswer === option
                ? "border-[#4f46e5] bg-[#eef2ff] text-[#312e81]"
                : "border-[#d1d5db] bg-white text-[#374151] hover:border-[#9ca3af]"
            }`}
            style={{
              boxShadow:
                selectedAnswer === option
                  ? "0 0 0 4px rgba(79, 70, 229, 0.5)"
                  : "",
            }}
          >
            <div className="flex items-center">
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 font-medium ${
                  selectedAnswer === option
                    ? "bg-[#4f46e5] text-white"
                    : "bg-[#e5e7eb] text-[#4b5563]"
                }`}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-left">{decodeHTML(option)}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
