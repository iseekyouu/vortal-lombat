import React from 'react';
import './App.css';
import Players from './Players';
import Fighter from './Fighter';

function App() {
  const [selectedFighter, setSelectedFighter] = React.useState<Fighter | null>(null);
  const [hideFighters, setHideFighters] = React.useState(false);


  function chooseFighter(fighter: Fighter) {
    setSelectedFighter(fighter);
    setHideFighters(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          VORTAL LOMBAT 0.0.0
        </p>
        <Players chooseFighter={chooseFighter} hideFighters={hideFighters} />
      </header>
    </div>
  );
}

export default App;
