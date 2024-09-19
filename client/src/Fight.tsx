import React from "react";
import Fighter from "./Fighter";

interface FightProps {
  player1: Fighter;
  player2: Fighter;
}

const Fight: React.FC<FightProps> = ({ player1, player2 }) => {
  const handleFight = () => {
    console.log('fight!');
  };

  return (
    <div>
      <h1>
        Fight between {player1.name} and {player2.name}
      </h1>
      <button onClick={handleFight}>Start Fight</button>
    </div>
  );
};

export default Fight;
