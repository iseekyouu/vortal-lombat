import React from "react";
import Fighter from "./Fighter";

interface FightProps {
  fighter1: Fighter;
  fighter2: Fighter;
  onFightEnd: (winner: Fighter) => void;
}

const Fight: React.FC<FightProps> = ({ fighter1, fighter2, onFightEnd }) => {
  const handleFight = () => {
    // Simulate a fight and determine a winner
    const winner = Math.random() > 0.5 ? fighter1 : fighter2;
    onFightEnd(winner);
  };

  return (
    <div>
      <h1>
        Fight between {fighter1.name} and {fighter2.name}
      </h1>
      <button onClick={handleFight}>Start Fight</button>
    </div>
  );
};

export default Fight;
