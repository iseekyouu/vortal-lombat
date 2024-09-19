import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Players from "./Players";
import Fight from "./Fight";
import fighters from "./Fighters";

function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [player1, setPlayer1] = useState(fighters[0]);
  const [player2, setPlayer2] = useState(fighters[1]);

  const renderComponent = () => {
    switch (currentScreen) {
      case 0:
        return <Players />;
      case 1:
        return (
          <Fight
            player1={player1}
            player2={player2}
            setPlayer1={setPlayer1}
            setPlayer2={setPlayer2}
          />
        );
      default:
        return <Players />;
    }
  };

  return <div className="App">{renderComponent()}</div>;
}

export default App;
