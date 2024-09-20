import React, { useCallback, useEffect, useRef } from "react";
import Fighter from "./Fighter";
import Emblem2 from "./gifs/emblem_2.gif";
import Hit1 from './audio/hit_1.mp3';
import Hit2 from './audio/hit_2.mp3';
import Hit3 from './audio/hit_3.mp3';
import Hit4 from './audio/hit_4.mp3';
import Hit5 from './audio/hit_5.mp3';
import useAudio from './useAudio';
import RoundAnnounce from './audio/round_announce.mp3';
import EasterEggSound from './audio/easter_egg_1.mp3';

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
  muted?: boolean;
}

// Player Sheet styled like MK3's player stats panel
const PlayerSheet: React.FC<{ player: Fighter }> = ({ player }) => {
  return (
    <div
      className="flex flex-col items-center
     border-red-600 p-4 shadow-xl bg-zinc-800 text-yellow-400
     max-w-[20%] min-w-[20%]
     "
    >
      <img
        src={player.avatar}
        alt={player.name}
        className="w-40 h-40 border-yellow-600 shadow-lg mb-4"
      />
      <h2 className="text-3xl font-bold uppercase">{player.name}</h2>
      <p className="text-lg mt-2">Health: {player.health}</p>
      <p className="text-lg">
        Power: {player.powerMin} - {player.powerMax}
      </p>
      <p className="text-lg">Defense: {player.defense}</p>
      <p className="text-lg">Critical: {player.critical}</p>
      <p className="text-lg">Evasion: {player.evasion}</p>
    </div>
  );
};

// Combat log styled in MK3's bold text style with colorful damage indicators
const CombatLog: React.FC<{ rounds: ResponseFight[]; isLoading: boolean }> = ({
  rounds,
  isLoading,
}) => {
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
       `}
      style={{ maxHeight: "calc(100vh - 300px)" }} // Adjust height accordingly
    >
      {rounds.map((entry, index) => {
        const p1dmgText =
          parseInt(entry.p1dmg) > 0 ? `Damage: ${entry.p1dmg}` : "УВОРОТ!!!";
        const p2dmgText =
          parseInt(entry.p2dmg) > 0 ? `Damage: ${entry.p2dmg}` : "УВОРОТ!!!";

        return (
          <div key={index} className="mb-4 text-lg">
            <p>
              <span className="text-blue-400">{entry.p1text}</span>
              <span className="ml-2 text-red-400 font-bold ">{p1dmgText}</span>
            </p>
            <p>
              <span className="text-green-400">{entry.p2text}</span>
              <span className="ml-2 text-red-400 font-bold ">{p2dmgText}</span>
            </p>
          </div>
        );
      })}

      {/* Typing Loader */}
      {isLoading && (
        <div className={`flex justify-center
        ml-2 ${isScrollVisible ? "" : "mr-2"}
        `}>
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
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Focus the button when it becomes available (i.e., when fightFinished is true)
  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className="text-6xl font-bold text-yellow-400 uppercase border-4 border-red-600 bg-black px-8 py-4 mt-8
        hover:bg-red-600 hover:text-white hover:border-yellow-400 shadow-lg animate-pulse transition-all duration-300
        "
    >
      Finish Him!
    </button>
  );
};

// Main Fight component styled like MK3
const Fight: React.FC<FightProps> = ({ player1, player2, onFightFinish, muted }) => {
  const [combatLog, setCombatLog] = React.useState<ResponseFight[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [fightFinished, setFightFinished] = React.useState(false);


  const { play: playHit1, audioRef: hit1Ref } = useAudio(Hit1, muted);
  const { play: playHit2, audioRef: hit2Ref } = useAudio(Hit2, muted);
  const { play: playHit3, audioRef: hit3Ref } = useAudio(Hit3, muted);
  const { play: playHit4, audioRef: hit4Ref } = useAudio(Hit4, muted);
  const { play: playHit5, audioRef: hit5Ref } = useAudio(Hit5, muted);
  const { play: playRoundAnnounce, audioRef: roundAnnounceRef } = useAudio(RoundAnnounce, muted);
  const { play: playEasterEgg, audioRef: EasterEggSoundRef } = useAudio(EasterEggSound, muted);

  const hitSounds = [
    { play: playHit1, audioRef: hit1Ref },
    { play: playHit2, audioRef: hit2Ref },
    { play: playHit3, audioRef: hit3Ref },
    { play: playHit4, audioRef: hit4Ref },
    { play: playHit5, audioRef: hit5Ref },
  ];

  const handleRound = useCallback(async () => {
    const hitIndex = Math.floor(Math.random() * hitSounds.length);

    setIsLoading(true);
    const apiUrl = process.env.NODE_ENV === 'production' ? 'https://vlombat.vlprojects.pro/api' : 'http://localhost:3092/api';
    const response = await fetch(`${apiUrl}/fight`, {
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

    const randomChance = Math.floor(Math.random() * 100) + 1;
    if (randomChance <= 5) {
      playEasterEgg(); // Call the Easter Egg function with 5% probability
    } else {
      hitSounds[hitIndex].play();
    }

    if (player1.health <= 0 || player2.health <= 0) {
      setFightFinished(true);
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  }, [player1, player2, combatLog, onFightFinish]);

  function finishHim() {
    onFightFinish(
      Math.max(player1.health, player2.health) === player1.health
        ? player1
        : player2
    );
  }

  React.useEffect(() => {
    if (!isLoading && !fightFinished) {
      handleRound();
    }
  }, [isLoading, handleRound, fightFinished]);

  React.useEffect(() => {
    playRoundAnnounce();
  }, [])

  return (
    <div className="flex flex-col items-center bg-black text-white min-h-screen">
      <h1 className="text-red-600 text-5xl font-bold uppercase mb-6 animate-pulse">
        Fight between {player1.name} and {player2.name}
      </h1>
      <div className="flex w-full justify-around items-start bg-zinc-900 p-6 rounded-lg">
        <PlayerSheet player={player1} />
        <div>
          <CombatLog rounds={combatLog} isLoading={isLoading} />
        </div>

        <PlayerSheet player={player2} />
      </div>
      <div className='mb-15'>{fightFinished && <FinishHimButton onClick={finishHim} />}</div>
      <audio ref={hit1Ref} src={Hit1} />
      <audio ref={hit2Ref} src={Hit2} />
      <audio ref={hit3Ref} src={Hit3} />
      <audio ref={hit4Ref} src={Hit4} />
      <audio ref={hit5Ref} src={Hit5} />
      <audio ref={roundAnnounceRef} src={RoundAnnounce} />
      <audio ref={EasterEggSoundRef} src={EasterEggSound} />

    </div>
  );
};

export default Fight;
