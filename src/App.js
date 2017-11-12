import React, { Component } from 'react';
import './App.css';
import SearchBar from './SearchBar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Weather App</h1>
        <SearchBar/>
      </div>
    );
  }
}

export default App;
