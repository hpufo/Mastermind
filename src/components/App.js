import React, { Component } from 'react';
import styles from '../scss/App.scss';
import Game from './Game';

class App extends Component {
  state = {
    message: ''
  };
  setMessage = (message) => {
    this.setState({message: message});
  }
  clearMessage = () => {
    this.setState({message: ''});
  }
  render() {
    const {message} = this.state;
    return (
      <div className={styles.App}>
        <h1>Mastermind</h1>
        {message ? <p className={styles.message} onClick={this.clearMessage}>{message}</p>:<div />}
        <Game setMessage={this.setMessage}/>
      </div>
    );
  }
}

export default App;
