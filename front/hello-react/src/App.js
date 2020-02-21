import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to <code>rollrat.com</code> !!
        </p>
        Go to <a
          className="App-link"
          href="https://api.rollrat.com"
          target="_blank"
          rel="noopener noreferrer"
        > api.rollrat.com
        </a>
      </header>
    </div>
  );
}

export default App;
