import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//https://github.com/jmonta01/somafm-webplayer/blob/master/app/config/prod-config.json
//http://somafm.com/channels.json

class App extends Component {

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div className="test">
          Play
          Tracking
          Timer
          Volume



        </div>

      </div>
    );
  }



}

export default App;
