import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {saveScore} from '../service/api';
import styles from '../scss/GameOver.scss';

class GameOver extends Component {
  state = {
    name: ''
  };
  handleChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }
  onSubmit = (e) => {
    e.preventDefault();
    let {name} = this.state;
    if(name){
      saveScore(name, this.scorePlayer())
      .then(() => {
        this.setState({name: ''});
        this.props.reset();
      })
      .catch(e => {
        console.log(e.message);
        this.props.setMessage('Failed to save your score, sorry');
      });
    }
  }
  scorePlayer(){
    let completeionBonus = 100;
    return (10 - this.props.turns) * 100 + completeionBonus;
  }
  render() {
    if(this.props.gameOver === 1){
      return (
        <div className={styles.GameOver}>
          <h1>You won!</h1>
          <h3>Your score: {this.scorePlayer()}</h3>
          <form onSubmit={this.onSubmit}>
            <label>Enter your name:</label>
            <input type="text" className={styles.Name} onChange={this.handleChange} value={this.state.name} />
            <input type="submit" value="Enter" />
          </form>
        </div>
      );
    }
    return (
      <div className={styles.GameOver}>
        <h1>Game Over</h1>
        <h2>You ran out of trys</h2>
        <button onClick={this.props.reset}>Retry</button>
      </div>
    );
  }
}

GameOver.propTypes = {
  reset: PropTypes.func.isRequired,
  turns: PropTypes.number.isRequired,
  gameOver: PropTypes.number.isRequired,
  setMessage: PropTypes.func.isRequired
};

export default GameOver;
