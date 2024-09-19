import React from 'react';
import './App.css';
import PlayersScreen from './PlayersScreen';
import Fighter from './Fighter';
import Fight from "./Fight";
import Fighters from './Fighters';
import VersusScreen from './VersusScreen';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="App">
      <header className="App-header">
        <p>VORTAL LOMBAT 0.0.0</p>
        <div className="h-[80vh]">
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


  function chooseFighter(fighter: Fighter) {
    setSelectedFighter(fighter);
    setHideFighters(true);
    setCurrentScreen(SCREENS.VERSUS);
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
          />
        );
        case SCREENS.WIN:
          return <h1>WIN</h1>
      default:
        return renderPlayers();
    }
  };

  return <MainLayout> {renderComponent()}</MainLayout>
}


export default App;
