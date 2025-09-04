import React from 'react';

const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-[#374151]">
          Question {current} of {total}
        </span>
        <span className="text-sm font-medium text-[#374151]">
          {Math.round(percentage)}% Complete
        </span>
      </div>
      <div className="w-full bg-[#e5e7eb] rounded-full h-3 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-[#6366f1] to-[#9333ea] h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;