import React, { useCallback } from "react";
import Fighter from "./Fighter";
import TypingSpinner from "./TypingSpinner";

type ResponseFight = {
  p1dmg: string;
  p2dmg: string;
  p1text: string;
  p2text: string;
};

interface FightProps {
  player1: Fighter;
  player2: Fighter;
  onFightFinish: (winner: Fighter) => void;
}

const PlayerSheet: React.FC<{ player: Fighter }> = ({ player }) => {
  return (
    <div className="flex flex-col items-center border-indigo-600 border-2">
      <img src={player.avatar} alt={player.name} className="max-w-[150px]" />
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

const CombatLog: React.FC<{ rounds: ResponseFight[]; isLoading: boolean }> = ({
  rounds,
  isLoading,
}) => {
  return (
    <div className="border-indigo-600 border-2 grow px-3 pt-2">
      {rounds.map((entry, index) => (
        <div key={index} className="mb-1">
          <p>
            <span className="text-blue-600">{entry.p1text}</span>
            <span className="ml-2 text-rose-600">Урон: {entry.p1dmg}</span>
          </p>
          <p>
            <span className="text-emerald-600">{entry.p2text}</span>
            <span className="ml-2 text-rose-600">Урон: {entry.p2dmg}</span>
          </p>
        </div>
      ))}
      <Loader active={isLoading} />
    </div>
  );
};

const Loader: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) return null;

  return (
    <div>
      <TypingSpinner />
    </div>
  );
};

const Fight: React.FC<FightProps> = ({ player1, player2, onFightFinish }) => {
  const [combatLog, setCombatLog] = React.useState<ResponseFight[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleRound = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch("http://localhost:3092/fight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fighter1: player1, fighter2: player2 }),
    });

    const result: ResponseFight = await response.json();
    setCombatLog([...combatLog, result]);

    player1.health -= parseInt(result.p2dmg);
    player2.health -= parseInt(result.p1dmg);

    if (player1.health <= 0 || player2.health <= 0) {
      onFightFinish(Math.max(player1.health, player2.health) === player1.health ? player1 : player2);
      return true;
    }

    setIsLoading(false);
    return false;
  }, [player1, player2, combatLog, onFightFinish]);

  // React.useEffect(() => {
  //   if (!isLoading) {
  //     handleRound();
  //   }
  // }, [isLoading, handleRound]);

  return (
    <div>
      <h1>
        Fight between {player1.name} and {player2.name}
      </h1>
      <div className="flex w-full bg-zinc-200">
        <PlayerSheet player={player1} />
        <CombatLog rounds={combatLog} isLoading={isLoading} />
        <PlayerSheet player={player2} />
      </div>
    </div>
  );
};

export default Fight;
