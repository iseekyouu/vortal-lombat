import React, { useEffect, useState } from 'react';
import VLogo from "./vlombat-logo.webp";
import DLCPageIcon from './DlcPageIcon';

const StartScreen: React.FC<{
  onStart: (muted?: boolean) => void,
  onDlcClick: () => void,
}> = ({ onStart, onDlcClick }) => {
  // Listen for the "Enter" key press
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key) {
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
    <div className="flex flex-col items-center justify-center h-screen bg-[#181922] text-white">
      <img src={VLogo} alt="Vortal Lombat" className="w-96 h-96" />

      {/* Title */}
      <h1 className="text-6xl font-bold text-red-600 uppercase mb-8">
        Vortal Lombat 1.0.3
      </h1>

      <div className="text-yellow-400 text-4xl animate-pulse flex content-center flex-col">
        Press any key to continue
        {/* Button with the MK3 style */}
      </div>

      <br />
      <br />
      <br />
      <br />

        <button
            onClick={() => onStart(true)}
            className="px-6 py-3 bg-red-600 text-white text-xl font-bold rounded-lg uppercase tracking-wider
                      hover:bg-red-800 hover:text-yellow-400 transition-all duration-300 shadow-lg"
          >
            Start in muted mode
          </button>
        <br />
        <DLCPageIcon onClick={onDlcClick} />
      </div>
  );
};

export default StartScreen;