import React, { useState, useEffect } from 'react';
import fighters, { Fighter } from './Fighters'; // Keeping the original import

interface GridItemProps {
  fighter: Fighter;
  onSelect: (fighter: Fighter) => void;
  isSelected: boolean;
  choosingPlayer2: boolean; // New prop for player2 animation
}

interface GridProps {
  chooseFighter: (fighter: Fighter) => void;
  hideFighters: boolean;
  chooseFighter2: (fighter: Fighter) => void;
}

// GridItem Component
const GridItem: React.FC<GridItemProps> = ({ fighter, onSelect, isSelected, choosingPlayer2 }) => (
  <div
    className={`relative h-40 w-40 bg-cover bg-center border-4
      ${isSelected ? 'border-red-600 scale-110' : 'border-yellow-600 hover:scale-110'}
      ${choosingPlayer2 ? 'animate-pulse' : ''}
      shadow-xl transition-transform duration-300 hover:border-red-600`}
    style={{ backgroundImage: `url(${fighter.avatar})`, boxShadow: "inset 0 0 10px black, 0 0 15px red" }}
    onClick={() => onSelect(fighter)} // Handle item click
  >
    <div className="absolute bottom-0 left-0 right-0 bg-red-800 bg-opacity-75 text-center text-yellow-400 font-bold text-xs uppercase tracking-wider py-1">
      <span>{fighter.name}</span>
    </div>
  </div>
);

const GridLayout: React.FC<GridProps> = ({ chooseFighter, hideFighters, chooseFighter2 }) => {
  const [selectedFighter, setSelectedFighter] = useState<Fighter | null>(null);
  const [choosingPlayer2, setChoosingPlayer2] = useState(false);
  const [shuffledFighters, setShuffledFighters] = useState<Fighter[]>([]);

  const shuffleArray = (array: Fighter[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  // Shuffle fighters on component mount
  useEffect(() => {
    setShuffledFighters(shuffleArray(fighters).slice(0, 15));
  }, []);

  // Function to handle player2 selection with animation
  const choosePlayer2 = (onFinish: (fighter2: Fighter) => void) => {
    setChoosingPlayer2(true);

    const availableFighters = shuffledFighters.filter(f => f.name !== selectedFighter?.name);
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % availableFighters.length;
    }, 200); // Change player every 200ms

    setTimeout(() => {
      clearInterval(interval);
      const randomPlayer2 = availableFighters[Math.floor(Math.random() * availableFighters.length)];
      setChoosingPlayer2(false);
      onFinish(randomPlayer2); // Only submit player1 after animation ends
    }, 3000); // Stop selection after 3 seconds
  };

  // Handle fighter selection
  const handleSelectFighter = (fighter: Fighter) => {
    setSelectedFighter(fighter);
  };

  // Submit selected fighter and start choosing player2
  const submitFighter = (selectedFighter: Fighter) => {
    choosePlayer2((fighter2: Fighter) => {
      chooseFighter(selectedFighter); // Submit player1 only after player2 selection finishes
      chooseFighter2(fighter2); // Submit player2
    });
  };

  return (
    <div className={`flex flex-col items-center ${hideFighters ? 'opacity-0 scale-50 transition-all duration-1000 ease-in-out' : ''}`}>
      <h1 className="text-yellow-400 text-4xl font-bold uppercase tracking-wide text-center mb-6 animate-pulse shadow-lg">
        Choose Your Destiny
      </h1>

      <div className="grid grid-cols-5 gap-0 p-0">
        {shuffledFighters.map((fighter) => (
          <GridItem
            key={fighter.name}
            fighter={fighter}
            onSelect={handleSelectFighter}
            isSelected={selectedFighter?.name === fighter.name}
            choosingPlayer2={choosingPlayer2} // Pass the state to indicate player2 is being chosen
          />
        ))}
      </div>

      {selectedFighter && (
        <button
          onClick={() => submitFighter(selectedFighter)} // Call the function when submitting
          className="mt-4 px-4 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-800 transition-colors"
        >
          Submit {selectedFighter.name}
        </button>
      )}

      {choosingPlayer2 && (
        <div className="mt-4 text-yellow-400 font-bold text-2xl">
          Choosing Player 2...
        </div>
      )}
    </div>
  );
};

export default GridLayout;