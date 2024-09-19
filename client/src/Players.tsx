import React from 'react';
import fighters, { Fighter } from './Fighters';

interface GridItemProps {
  fighter: Fighter;
  onSelect: (fighter: Fighter) => void;
  isSelected: boolean;
}

interface GridProps {
  chooseFighter: (selectedFighter: Fighter) => void;
  hideFighters: boolean;
  setPlayer2: (fighter: Fighter) => void;
}


const shuffleArray = (array: Fighter[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

const shuffledFighters = shuffleArray([...fighters]).slice(0, 15);

const GridItem: React.FC<GridItemProps> = ({ fighter, onSelect, isSelected }) => (
  <div
    className={`relative h-40 w-40 bg-cover bg-center border-4
      ${isSelected ? 'border-red-600 scale-110' : 'border-yellow-600 hover:scale-110'}
      shadow-xl transition-transform duration-300 hover:border-red-600`}
    style={{ backgroundImage: `url(${fighter.avatar})`, boxShadow: "inset 0 0 10px black, 0 0 15px red" }}
    onClick={() => onSelect(fighter)} // Handle item click
  >
    <div className="absolute bottom-0 left-0 right-0 bg-red-800 bg-opacity-75 text-center text-yellow-400 font-bold text-xs uppercase tracking-wider py-1">
      <span>{fighter.name}</span>
    </div>
  </div>
);


const GridLayout: React.FC<GridProps> = ({ chooseFighter, hideFighters }) => {
  const [selectedFighter, setSelectedFighter] = React.useState<Fighter | null>(null);
  const [choosingPlayer2, setChoosingPlayer2] = React.useState(false); // To manage animation state

  const choosePlayer2 = () => {
    setChoosingPlayer2(true);

    // code
  }

  const handleSelectFighter = (fighter: Fighter) => {
    setSelectedFighter(fighter);
  };

  const submitFighter = (selectedFighter: Fighter) => {
    choosePlayer2();
    chooseFighter(selectedFighter)
  }


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

  </div>
  );
};

export default GridLayout;