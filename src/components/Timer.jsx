import React from 'react';

const Timer = ({ timeLeft, isActive }) => {
  const percentage = (timeLeft / 30) * 100;
  const isLow = timeLeft <= 10;
  
  return (
    <div className="flex items-center space-x-3">
      <div className="relative w-16 h-16">
        <svg className="transform -rotate-90 w-16 h-16">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-[#e5e7eb]"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 28}`}
            strokeDashoffset={`${2 * Math.PI * 28 * (1 - percentage / 100)}`}
            className={`transition-all duration-1000 ${
              isLow ? 'text-[#ef4444]' : 'text-[#4f46e5]'
            }`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-lg font-bold ${
            isLow ? 'text-[#ef4444] animate-pulse' : 'text-[#374151]'
          }`}>
            {timeLeft}
          </span>
        </div>
      </div>
      <div className="text-sm text-[#4b5563]">
        {isActive ? 'Time remaining' : 'Timer paused'}
      </div>
    </div>
  );
};

export default Timer;