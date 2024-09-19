import React, { useEffect, useState } from 'react';

const StartScreen: React.FC<{ onStart: (muted?: boolean) => void }> = ({ onStart }) => {
  const [showMessage, setShowMessage] = useState(true);

  // Listen for the "Enter" key press
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        onStart(); // Call the onStart function when Enter is pressed
      }
    };

    // Add event listener for keypress
    document.addEventListener('keydown', handleKeyPress);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onStart]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-6xl font-bold text-red-600 uppercase mb-8">
        Vortal Lombat 0.0.2
      </h1>

      {/* Animated "Press Enter to Start" message */}
      {showMessage && (
        <div className="text-yellow-400 text-4xl animate-pulse flex content-center flex-col">
          Press Enter to Start with music
          <div className="text-xl font-bold text-red-600 uppercase text-center p-4">or</div>

          {/* Button with the MK3 style */}
          <button
            onClick={() => onStart(true)}
            className="px-6 py-3 bg-red-600 text-white text-xl font-bold rounded-lg uppercase tracking-wider
                      hover:bg-red-800 hover:text-yellow-400 transition-all duration-300 shadow-lg"
          >
            Press button to start without
          </button>
        </div>
      )}
    </div>
  );
};

export default StartScreen;