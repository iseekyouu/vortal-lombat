import React from 'react';

const DlcScreen: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      {/* Title */}
      <h1 className="text-6xl text-red-600 font-bold uppercase mb-12 animate-pulse">
        DLC
      </h1>

      {/* Multiplayer Section */}
      <div className="mb-8">
        <h2 className="text-4xl text-yellow-400 font-bold uppercase mb-4">
          Multiplayer
        </h2>
        <p className="text-xl text-red-600 uppercase font-bold mb-6">
          Kickstarter 1000$
        </p>
        <button
          className="px-6 py-3 bg-red-600 text-white text-xl font-bold rounded-lg uppercase tracking-wider hover:bg-red-800 hover:text-yellow-400 transition-all duration-300 shadow-lg"
          onClick={onClick}
          >
          Support on Kickstarter
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-red-600 w-full max-w-2xl my-12"></div>

      {/* Cheat Page Section */}
      <div>
        <h2 className="text-4xl text-yellow-400 font-bold uppercase mb-4">
          Cheat Page
        </h2>
        <p className="text-xl text-red-600 uppercase font-bold mb-6">
          Adjust your favorite character before the fight and choose any other as the enemy!
        </p>
        <button className="px-6 py-3 bg-red-600 text-white text-xl font-bold rounded-lg uppercase tracking-wider hover:bg-red-800 hover:text-yellow-400 transition-all duration-300 shadow-lg"
          onClick={onClick}
        >
          Go to Cheat Page
        </button>
      </div>
    </div>
  );
};

export default DlcScreen;