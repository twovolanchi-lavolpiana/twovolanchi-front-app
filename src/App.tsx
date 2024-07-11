import React from 'react';
import './App.css';
import NavBar from './component/Navbar';
import { Board } from './component/Board';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <header className="App-header">
        <Board/>
      </header>
    </div>
  );
}

export default App;
