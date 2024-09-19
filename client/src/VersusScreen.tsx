import React, { useEffect, useState } from 'react';
import { Fighter } from './Fighters';
import VersusBackground from './backgrounds/versusbackground.jpg';

interface FightLoadingScreenProps {
  player1: Fighter;
  player2: Fighter;
  onFightStart: () => void;
}

const VersusScreen: React.FC<FightLoadingScreenProps> = ({ player1, player2, onFightStart }) => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Simulate loading screen with a timer before starting the fight
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete(true);
      onFightStart(); // Start the fight after the loading completes
    }, 3000); // 3 seconds loading screen

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [onFightStart]);

  return (
    <div
      className="flex items-center justify-center h-[70vh] w-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${VersusBackground})`, // Set the background image
      }}
    >
      <div className="flex justify-center items-center space-x-16">
        {/* Player 1 */}
        <div className="flex flex-col items-center">
          <img
            src={player1.avatar}
            alt={player1.name}
            className="w-40 h-40 border-4 border-yellow-600 shadow-lg"
          />
          <h2 className="text-yellow-400 text-4xl font-bold uppercase mt-4">{player1.name}</h2>
        </div>

        {/* VS */}
        <div className="text-red-600 text-7xl font-bold animate-pulse">
          VS
        </div>

        {/* Player 2 */}
        <div className="flex flex-col items-center">
          <img
            src={player2.avatar}
            alt={player2.name}
            className="w-40 h-40 border-4 border-yellow-600 shadow-lg"
          />
          <h2 className="text-yellow-400 text-4xl font-bold uppercase mt-4">{player2.name}</h2>
        </div>
      </div>

      {/* Loading Spinner / Fight Animation */}
      {!loadingComplete && (
        <div className="mt-12">
          <div className="text-5xl text-yellow-400 font-bold uppercase animate-bounce">FIGHT!</div>
          <div className="mt-4 text-lg text-red-600 animate-pulse">Loading...</div>
        </div>
      )}

      {/* Hidden when loading is complete */}
      {loadingComplete && (
        <div className="mt-12">
          <div className="text-5xl text-red-600 font-bold uppercase animate-pulse">Fight begins!</div>
        </div>
      )}
    </div>
  );
};

export default VersusScreen;