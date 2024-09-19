import React from 'react';
import './App.css';
import Players from './Players';
import Fighter from './Fighter';
import Fight from "./Fight";
import Fighters from './Fighters';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="App">
      <header className="App-header">
        <p>VORTAL LOMBAT 0.0.0</p>
        {children}
      </header>
    </div>
  );
};

function App() {
  const [selectedFighter, setSelectedFighter] = React.useState<Fighter | null>(null);
  const [hideFighters, setHideFighters] = React.useState(false);
  const [currentScreen, setCurrentScreen] = React.useState(1);
  const [player2, setPlayer2] = React.useState<Fighter | null>(Fighters[0]);


  function chooseFighter(fighter: Fighter) {
    setSelectedFighter(fighter);
    setHideFighters(true);
    setCurrentScreen(1);
  }

  const renderPlayers = () => <Players
    chooseFighter={chooseFighter}
    hideFighters={hideFighters}
    chooseFighter2={setPlayer2}
  />

  const renderComponent = () => {
    console.log({ selectedFighter, player2, currentScreen });

    if (selectedFighter === null || player2 === null) {
      return renderPlayers();
    }

    switch (currentScreen) {
      case 0:
        return renderPlayers();
      case 1:
        return (
          <Fight
            player1={selectedFighter}
            player2={player2}
          />
        );
      default:
        return renderPlayers();
    }
  };

  return <MainLayout> {renderComponent()}</MainLayout>
}


export default App;
