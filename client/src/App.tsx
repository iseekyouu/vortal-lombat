import React from 'react';
import './App.css';
import Players from './Players';
import Fighter from './Fighter';
import Fight from "./Fight";
import Fighters from './Fighters';

function App() {
  const [selectedFighter, setSelectedFighter] = React.useState<Fighter | null>(null);
  const [hideFighters, setHideFighters] = React.useState(false);
  const [currentScreen, setCurrentScreen] = React.useState(1);
  const [player2, setPlayer2] = React.useState<Fighter | null>(Fighters[0]);
  // TODO PC PLAYER


  function chooseFighter(fighter: Fighter) {
    setSelectedFighter(fighter);
    setHideFighters(true);
    setCurrentScreen(1);
  }

  const renderComponent = () => {


    if (selectedFighter === null || player2 === null) {
      return <Players chooseFighter={chooseFighter} hideFighters={hideFighters} />;
    }

    switch (currentScreen) {
      case 0:
        return <Players chooseFighter={chooseFighter} hideFighters={hideFighters} />
      case 1:
        return (
          <Fight
            player1={selectedFighter}
            player2={player2}
          />
        );
      default:
        return <Players chooseFighter={chooseFighter} hideFighters={hideFighters} />;
    }
  };

  return renderComponent();
}


export default App;
