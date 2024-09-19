import React from 'react';
import logo from './logo.svg';
import './App.css';
import Players from './Players';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          VORTAL LOMBAT 0.0.0
        </p>
        <Players />
      </header>
    </div>
  );
}

export default App;
