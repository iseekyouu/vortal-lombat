import Fighter from './Fighter';
import PlayerSelectionSound from './audio/player_selection.mp3';
import React from 'react';
import useAudio from './useAudio';

interface GridItemProps {
  fighter: Fighter;
  onSelect: (fighter: Fighter) => void;
  isSelected: boolean;
  choosingPlayer2: boolean; // New prop for player2 animation
  muted?: boolean;
}

const GridItem: React.FC<GridItemProps> = ({
  fighter, onSelect, isSelected, choosingPlayer2, muted,
 }) => {
  const { play, audioRef } = useAudio(PlayerSelectionSound, muted);

  return (
    <div
      className={`relative h-40 w-40 bg-cover bg-center border-4
        ${isSelected ? 'border-red-600 scale-110' : 'border-yellow-600 hover:scale-110'}
        ${choosingPlayer2 ? 'animate-pulse' : ''}
        shadow-xl transition-transform duration-300 hover:border-red-600`}
      style={{ backgroundImage: `url(${fighter.avatar})`, boxShadow: "inset 0 0 10px black, 0 0 15px red" }}
      onClick={() => onSelect(fighter)} // Handle item click
      onMouseEnter={play} // Play sound on hover
    >
      <div className="absolute bottom-0 left-0 right-0 bg-red-800 bg-opacity-75 text-center text-yellow-400 font-bold text-xs uppercase tracking-wider py-1">
        <span>{fighter.name}</span>
      </div>

      {/* Audio element for hover sound */}
      <audio ref={audioRef} src={PlayerSelectionSound} />
    </div>
  );
};

export default GridItem;