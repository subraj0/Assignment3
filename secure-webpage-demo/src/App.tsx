import React from 'react';
import logo from './logo.svg';
import LoginPage from './Components/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Secure Website Demo
        </p>
        {/* <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <LoginPage />
      </header>
    </div>
  );
}

export default App;
