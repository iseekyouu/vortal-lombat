import React from "react";
import "./App.css";
import PlayersScreen from "./PlayersScreen";
import Fighter from "./Fighter";
import Fight from "./Fight";
import Fighters from './Fighters';
import VersusScreen from './VersusScreen';
import WinnerScreen from './WinnerScreen';
import MainTheme from './audio/main_theme.m4a';
import AudioPlayer from './AudioPlayer';
import StartScreen from './StartScreen';
import { SCREENS } from './constants';
import DlcScreen from './DlcScreen';
import Ladder from "./Ladder";

const MainLayout: React.FC<{
  children: React.ReactNode;
  muted?: boolean;
  currentScreen: number;
}> = ({ children, muted, currentScreen }) => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <AudioPlayer
            audioSrc={MainTheme}
            playOnStart={!muted}
            currentScreen={currentScreen}
          />
        </p>
        <div className="h-screen w-full">{children}</div>
      </header>
    </div>
  );
};


function App() {
  const [selectedFighter, setSelectedFighter] = React.useState<Fighter | null>(
    Fighters[0]
  );
  const [hideFighters, setHideFighters] = React.useState(false);
  const [currentScreen, setCurrentScreen] = React.useState(SCREENS.START);
  const [player2, setPlayer2] = React.useState<Fighter>(Fighters[1]);
  const [winner, setWinner] = React.useState<Fighter>(Fighters[0]);
  const [muted, setMuted] = React.useState(false);

  function chooseFighter(fighter: Fighter) {
    setSelectedFighter(fighter);
    setHideFighters(true);
    setCurrentScreen(SCREENS.VERSUS);
  }

  function onFightFinish(winner: Fighter) {
    setWinner(winner);
    setCurrentScreen(SCREENS.WIN);
  }

  const renderPlayers = () => (
    <PlayersScreen
      chooseFighter={chooseFighter}
      hideFighters={hideFighters}
      chooseFighter2={setPlayer2}
      muted={muted}
    />
  );

  const renderLadder = () => <Ladder />;

  const renderComponent = () => {
    if (selectedFighter === null || player2 === null) {
      return renderPlayers();
    }

    switch (currentScreen) {
      case SCREENS.START:
        return <StartScreen
          onStart={(muted: boolean = false) => {
            setCurrentScreen(SCREENS.PLAYERS)
            if (muted) {
              setMuted(true);
            }
          }}
          onDlcClick={() => setCurrentScreen(SCREENS.DLC)}
        />
      case SCREENS.PLAYERS:
        return renderPlayers();
      case SCREENS.VERSUS:
        return (
          <VersusScreen
            player1={selectedFighter}
            player2={player2}
            onFightStart={() => setCurrentScreen(SCREENS.FIGHT)}
          />
        );
      case SCREENS.FIGHT:
        return (
          <Fight
            player1={selectedFighter}
            player2={player2}
            onFightFinish={onFightFinish}
            muted={muted}
          />
        );
      case SCREENS.WIN:
        return <WinnerScreen winner={winner} />;
      case SCREENS.LADDER:
        return renderLadder();

        case SCREENS.DLC:
          return <DlcScreen onClick={() => { setCurrentScreen(SCREENS.START)}}/>;

      default:
        return renderPlayers();
    }
  };

  if (SCREENS.START === currentScreen) {
    return renderComponent();
  }

  return (
    <MainLayout muted={muted} currentScreen={currentScreen}>
      {" "}
      {renderComponent()}
    </MainLayout>
  );
}

export default App;
