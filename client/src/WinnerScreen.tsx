import React from 'react';
import Fighter from './Fighter';
import Win1 from './backgrounds/win_1.jpeg';
import Win2 from './backgrounds/win_2.jpeg';
import Win3 from './backgrounds/win_3.png';
import Win4 from './backgrounds/win_4.jpg';
import Win5 from './backgrounds/win_5.jpg';
import LedenetsVideo from './gifs/ledenets.mp4';
import Babality1 from './gifs/babality_1.gif';
import Babality2 from './gifs/babality_2.gif';
import Babality3 from './gifs/babality_3.gif';
import Brutality1 from './gifs/brutality_1.gif';
import Brutality2 from './gifs/brutality_2.gif';
import Fatality1 from './gifs/fatality_1.gif';
import Fatality2 from './gifs/fatality_2.gif';
import Fatality3 from './gifs/fatality_3.gif'
import useAudio from './useAudio';
import Wins from './audio/wins/wins.m4a';
import UncleJenya from './audio/wins/unclejenya.m4a';


const winBackgroundArray = [
  Win1,
  Win2,
  Win3,
  Win4,
  Win5,
];

const winWordArray = [
  'Fatality',
  'Babality',
  'Brutality',
  'CHILDALITY!',
]

const endingGifs = [
  Babality1,
  Babality2,
  Babality3,
  Brutality1,
  Brutality2,
  Fatality2,
  Fatality3,
  Fatality1,
];

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

interface WinPageProps {
  winner: Fighter;
}

const WinText: React.FC<{}> = () => {
  const wordIndex = Math.floor(Math.random() * winWordArray.length);
  const endingGifIndex = Math.floor(Math.random() * endingGifs.length);

  if (wordIndex === 3) {
    return (
      <div className="text-center mt-8">
        <div className="flex justify-center mt-4 space-x-2 animate-bounce  bg-gray-800 rounded-2xl p-4">
          {winWordArray[wordIndex].split('').map((letter, index) => (
            <span
              key={index}
              className="text-5xl font-bold"
              style={{
                color: getRandomColor(), // Assign random color to each letter
                animation: 'spin 2s infinite linear', // Add some spin effect to each letter
              }}
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <video
            src={LedenetsVideo}
            className="w-[250px] h-[180px]"
            autoPlay
            loop
            muted
            controls={false}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="text-center mt-8">
    <div className="text-red-600 text-7xl font-bold uppercase animate-bounce  bg-gray-800 rounded-2xl p-4">
      Flawless Victory!
    </div>
    <div className="text-red-500 text-5xl font-bold mt-4 animate-pulse  bg-gray-800 rounded-2xl p-4">
      {winWordArray[wordIndex]}
    </div>
    <div className="mt-6 flex justify-center">
      <img
        src={endingGifs[endingGifIndex]}
        alt="Ending Gif"
        className="w-[250px] h-[180px]"
      />
    </div>
  </div>
  );
};

const WinnerScreen: React.FC<WinPageProps> = ({ winner }) => {
  const backgroundIndex = Math.floor(Math.random() * winBackgroundArray.length);
  const { play: playPlayerWinSound } = useAudio(winner.winSound, false);

  React.useEffect(() => {
    playPlayerWinSound();
    const timer = setInterval(() => playPlayerWinSound(), 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center h-[90vh] w-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${winBackgroundArray[backgroundIndex]})`, // Set the background image for the win screen
      }}
    >
      {/* Winner Section */}
      <div className="flex flex-col items-center">
        <img
          src={winner.avatar}
          alt={winner.name}
          className="w-40 h-40 border-4 border-yellow-600 shadow-lg mb-6"
        />
        <h2 className="text-yellow-400 text-4xl font-bold uppercase mt-4 animate-pulse  bg-gray-800 rounded-2xl p-4">
          {winner.name} Wins!
        </h2>
      </div>

      {/* Win Text */}
      <WinText />


      {/* Play Again Button */}
      <button
        className="mt-12 px-6 py-3 bg-red-600 text-white font-bold text-2xl rounded-lg hover:bg-red-800 transition-colors"
        onClick={() => window.location.reload()} // Example logic to reload the game
      >
        Play Again
      </button>
    </div>
  );
};

export default WinnerScreen;