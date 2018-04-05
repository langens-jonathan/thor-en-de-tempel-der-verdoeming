import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// importing my own game components
import Game from './components/game/game.js';


class App extends Component {
  render() {
      return (
              <div className="App">
              <Game />
      </div>
    );
  }
}

export default App;
