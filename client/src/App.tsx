import React from 'react';
import './App.css';
import PlayersScreen from './PlayersScreen';
import Fighter from './Fighter';
import Fight from "./Fight";
import Fighters from './Fighters';
import VersusScreen from './VersusScreen';
import WinnerScreen from './WinnerScreen';
import MainTheme from './audio/main_theme.m4a';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = React.useState(false);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play(); // Start playing on load
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>VORTAL LOMBAT 0.0.1</p>
        <audio ref={audioRef} src={MainTheme} autoPlay loop />

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="mt-4 px-6 py-3 bg-red-600 text-white font-bold text-xl rounded-lg hover:bg-red-800"
      >
        {isMuted ? 'Unmute' : 'Mute'}
      </button>

        <div className="h-screen w-full">
        {children}
        </div>
      </header>
    </div>
  );
};

const SCREENS = {
  PLAYERS: 0,
  FIGHT: 1,
  VERSUS: 2,
  WIN: 3,
}

function App() {
  const [selectedFighter, setSelectedFighter] = React.useState<Fighter | null>(Fighters[0]);
  const [hideFighters, setHideFighters] = React.useState(false);
  const [currentScreen, setCurrentScreen] = React.useState(SCREENS.PLAYERS);
  const [player2, setPlayer2] = React.useState<Fighter>(Fighters[1]);
  const [winner, setWinner] = React.useState<Fighter>(Fighters[0]);



  function chooseFighter(fighter: Fighter) {
    setSelectedFighter(fighter);
    setHideFighters(true);
    setCurrentScreen(SCREENS.VERSUS);
  }

  function onFightFinish(winner: Fighter) {
    setWinner(winner);
    setCurrentScreen(SCREENS.WIN);
  }

  const renderPlayers = () => <PlayersScreen
    chooseFighter={chooseFighter}
    hideFighters={hideFighters}
    chooseFighter2={setPlayer2}
  />

  const renderComponent = () => {
    if (selectedFighter === null || player2 === null) {
      return renderPlayers();
    }

    switch (currentScreen) {
      case SCREENS.PLAYERS:
        return renderPlayers();
      case SCREENS.VERSUS:
        return <VersusScreen player1={selectedFighter} player2={player2} onFightStart={() => setCurrentScreen(SCREENS.FIGHT)} />;
      case SCREENS.FIGHT:
        return (
          <Fight
            player1={selectedFighter}
            player2={player2}
            onFightFinish={onFightFinish}
          />
        );
        case SCREENS.WIN:
          return <WinnerScreen winner={winner} />;
      default:
        return renderPlayers();
    }
  };

  return <MainLayout> {renderComponent()}</MainLayout>
}


export default App;
