import React from 'react';

const TypingSpinner = () => {
  return (
    <div className="flex items-center space-x-1 pb-4">
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-100"></div>
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-500"></div>
    </div>
  );
};

export default TypingSpinner;