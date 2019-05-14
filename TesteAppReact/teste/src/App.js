import React from 'react';
import airplane from './airplane.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={airplane} className="App-logo" alt="airplane" />
        <p>
          Bem vindo ao Bandeco's Aeroclube!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cadastre-se
        </a>
      </header>
    </div>
  );
}

export default App;
