import React, { useCallback, useEffect, useRef } from "react";
import Fighter from "./Fighter";
import Emblem2 from './gifs/emblem_2.gif';

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

// Player Sheet styled like MK3's player stats panel
const PlayerSheet: React.FC<{ player: Fighter }> = ({ player }) => {
  return (
    <div className="flex flex-col items-center
     border-red-600 p-4 shadow-xl bg-zinc-800 text-yellow-400
     max-w-[20%] min-w-[20%]
     ">
      <img src={player.avatar} alt={player.name} className="w-40 h-40 border-yellow-600 shadow-lg mb-4" />
      <h2 className="text-3xl font-bold uppercase">{player.name}</h2>
      <p className="text-lg mt-2">Health: {player.health}</p>
      <p className="text-lg">Power: {player.powerMin} - {player.powerMax}</p>
      <p className="text-lg">Defense: {player.defense}</p>
      <p className="text-lg">Critical: {player.critical}</p>
      <p className="text-lg">Evasion: {player.evasion}</p>
    </div>
  );
};

// Combat log styled in MK3's bold text style with colorful damage indicators
const CombatLog: React.FC<{ rounds: ResponseFight[]; isLoading: boolean }> = ({ rounds, isLoading }) => {
  const logRef = useRef<HTMLDivElement>(null);
  const [isScrollVisible, setIsScrollVisible] = React.useState(false);

  // Auto scroll to the bottom when new messages are added
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight + 200;
    }
  }, [rounds]);


  useEffect(() => {
    const logElement = logRef.current;
    if (logElement) {
      setIsScrollVisible(logElement.scrollHeight > logElement.clientHeight);
    }
  }, [rounds]); // Re-check scroll visibility when new content is added
  return (
    <div
      ref={logRef}
      className={`p-4 grow text-yellow-400
       bg-zinc-800 overflow-y-auto max-h-full
       ml-2 ${isScrollVisible ? "" : "mr-2"}
       h-max-[80%]
       `}
      style={{ maxHeight: "calc(100vh - 200px)" }} // Adjust height accordingly
    >
      {rounds.map((entry, index) => (
        <div key={index} className="mb-4">
          <p>
            <span className="text-blue-400">{entry.p1text}</span>
            <span className="ml-2 text-red-400 font-bold">Damage: {entry.p1dmg}</span>
          </p>
          <p>
            <span className="text-green-400">{entry.p2text}</span>
            <span className="ml-2 text-red-400 font-bold">Damage: {entry.p2dmg}</span>
          </p>
        </div>
      ))}

      {/* Typing Loader */}
      {isLoading && (
        <div className="flex justify-center mt-4">
          <img src={Emblem2} alt="Loading..." className="w-12 h-12" />
        </div>
      )}

      {/* Scrollbar styling */}
      <style>{`
        div::-webkit-scrollbar {
          width: 8px;
        }

        div::-webkit-scrollbar-track {
          background: #1c1c1c; /* Dark background like MK3 theme */
        }

        div::-webkit-scrollbar-thumb {
          background-color: #ff0000; /* Red scrollbar thumb for MK3 style */
          border-radius: 10px;
          border: 2px solid #facc15; /* Border for contrast */
        }

        div::-webkit-scrollbar-thumb:hover {
          background-color: #ff4d4d; /* Lighter red on hover */
        }
      `}</style>
    </div>
  );
};

const FinishHimButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-6xl font-bold text-yellow-400 uppercase border-4 border-red-600 bg-black px-8 py-4 mt-8
        hover:bg-red-600 hover:text-white hover:border-yellow-400 shadow-lg animate-pulse transition-all duration-300"
    >
      Finish Him!
    </button>
  );
};


// Main Fight component styled like MK3
const Fight: React.FC<FightProps> = ({ player1, player2, onFightFinish }) => {
  const [combatLog, setCombatLog] = React.useState<ResponseFight[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [fightFinished, setFightFinished] = React.useState(false);

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
      setFightFinished(true);
      return true;
    }

    setIsLoading(false);
    return false;
  }, [player1, player2, combatLog, onFightFinish]);

  function finishHim() {
    onFightFinish(Math.max(player1.health, player2.health) === player1.health ? player1 : player2);
  }

  React.useEffect(() => {
    if (!isLoading) {
      handleRound();
    }
  }, [isLoading, handleRound]);

  return (
    <div className="flex flex-col items-center bg-black text-white min-h-screen">
      <h1 className="text-red-600 text-5xl font-bold uppercase mb-6 animate-pulse">
        Fight between {player1.name} and {player2.name}
      </h1>
      <div className="flex w-full justify-around items-start bg-zinc-900 p-6 rounded-lg">
        <PlayerSheet player={player1} />
        <CombatLog rounds={combatLog} isLoading={isLoading} />
        <PlayerSheet player={player2} />
      </div>
      <div>
        {fightFinished && <FinishHimButton onClick={finishHim} />}
      </div>
    </div>
  );
};

export default Fight;