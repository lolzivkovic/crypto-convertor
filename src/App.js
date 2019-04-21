import React, { Component } from 'react';
import Main from './components/Main'
import Convertor from './components/Convertor'

class App extends Component {

  render() {
    return (
      <div className='container'>
        <Convertor />
        <Main />
      </div>
    );
  }
}

export default App;
