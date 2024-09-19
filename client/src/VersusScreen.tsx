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
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 2600); // 3 seconds loading screen

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [onFightStart]);

  useEffect(() => {
    if (loadingComplete) {
      const timer = setTimeout(() => {
        onFightStart();
      }, 1500);
      return () => clearTimeout(timer); // Cleanup the timer on unmount
  }}, [loadingComplete]);

  return (
    <div
      className="flex flex-col items-center justify-center w-screen min-h-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${VersusBackground})`, // Set the background image
      }}
    >
      {/* Row 1: Players and VS */}
      <div className="flex justify-center items-center">
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
        <div className="text-red-600 text-7xl font-bold animate-pulse mx-8">
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

      {/* Row 2: FIGHT / Loading Animation */}
      <div className="flex justify-center items-center mt-12 ml-10">
        {!loadingComplete && (
          <div className="text-center">
            <div className="text-5xl text-yellow-400 font-bold uppercase animate-bounce">FIGHT!</div>
            <div className="mt-4 text-4xl text-red-600 animate-pulse">Loading...</div>
          </div>
        )}
      </div>

      {/* Row 3: Fight Begins */}
      <div className="flex justify-center items-center ml-10">
        {loadingComplete && (
          <div className="text-center">
            <div className="text-7xl text-yellow-400 font-bold uppercase animate-pulse">Fight begins!</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VersusScreen;