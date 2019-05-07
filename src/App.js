import React, { Component } from 'react';
import Main from './components/Main'
import Convertor from './components/Convertor'
import GlobalStats from './components/GlobalStats';

class App extends Component {

  render() {
    return (
      <div className='container'>
        <GlobalStats />
        <Convertor />
        <Main />
      </div>
    );
  }
}

export default App;
