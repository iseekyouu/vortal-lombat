import React from "react";
import Fighter from "./Fighter";

type Round = {
  p1dmg: number;
  p2dmg: number;
  text: string;
};

interface FightProps {
  player1: Fighter;
  player2: Fighter;
}

const PlayerSheet: React.FC<{ player: Fighter }> = ({ player }) => {
  return (
    <div className="flex flex-col items-center border-indigo-600 border-2">
      <img src={player.avatar} alt={player.name} />
      <h2>{player.name}</h2>
      <p>Health: {player.health}</p>
      <p>
        Power: {player.powerMin} - {player.powerMax}
      </p>
      <p>Defense: {player.defense}</p>
      <p>Critical: {player.critical}</p>
      <p>Evasion: {player.evasion}</p>
    </div>
  );
};

const CombatLog: React.FC<{ log: string[] }> = ({ log }) => {
  return (
    <div className="border-indigo-600 border-2 grow">
      {log.map((entry, index) => (
        <p key={index}>{entry}</p>
      ))}
    </div>
  );
};

const Fight: React.FC<FightProps> = ({ player1, player2 }) => {
  const [combatLog, setCombatLog] = React.useState<string[]>([
    "Fight started",
    "First round",
  ]);

  const handleRound = (round: Round) => {
    setCombatLog([...combatLog, round.text]);
    player1.health -= round.p2dmg;
    player2.health -= round.p1dmg;
  };

  return (
    <div>
      <h1>
        Fight between {player1.name} and {player2.name}
      </h1>
      <button
        onClick={() =>
          handleRound({
            p1dmg: 10,
            p2dmg: 5,
            text: "Player 1 hits Player 2 for 10 damage",
          })
        }
      >
        Start Fight
      </button>
      <div className="flex w-full bg-zinc-200 px-40">
        <PlayerSheet player={player1} />
        <CombatLog log={combatLog} />
        <PlayerSheet player={player2} />
      </div>
    </div>
  );
};

export default Fight;
