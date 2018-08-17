import React, { Component } from 'react';
import GuessForm from './GuessForm';
import Turns from './Turns';
import PropTypes from 'prop-types';
import {getScores} from '../service/api';
import LeaderBoard from './LeaderBoard';
import GameOver from './GameOver';
import styles from '../scss/Game.scss';

const initalState = {
  playerScores: [],
  randomNumber: [],
  turns: [],
  guess: ['','','',''],
  gameOver: -1, //-1 = game is ongoing, 0 = gameover out of turns, 1=gameover player won
};

function generateNumber(){
  let uniqueNumbers = [0,1,2,3,4,5,6,7,8,9];
  let randomNumber = [];
  let randomIndex;
  for(let i=0; i<4; i++){
    randomIndex = Math.floor(Math.random() * (uniqueNumbers.length-0) + 0);   //Get a random index from the array of uniqueNumbers
    randomNumber[i] = uniqueNumbers.splice(randomIndex,1)[0];                 //Remove the selected value from the unique array and add it to the random numbers
  }
  console.log('random number: '+randomNumber.join(''));
  return randomNumber;
}

class Game extends Component {
  state = initalState;

  componentDidMount(){
    //Set the random number first so that the player doesn't have to wait for the api call
    this.setState({randomNumber: generateNumber()});
    //Api call to get the scores
    getScores()
    .then((scores) => {
      this.setState({
        playerScores: scores
      });
    })
    .catch((e) => {
      this.props.setMessage('failed to get top players from the api');
      console.log(e.message);
    });
    
  }
  reset = () => {
    //Set the random number first so that the player doesn't have to wait for the api call
    this.setState(Object.assign({},initalState,{randomNumber: generateNumber()}))
    //Call get scores to update the top scores
    getScores()
      .then(scores => {
        this.setState({playerScores: scores});
      })
      .catch(e => {
        this.props.setMessage('failed to get top players from the api');
        console.log(e);
      });
  }
  handleChange = (index, e) => {
    //Only allow 0-9 inputs in each field
    if(/^[0-9]?$/.test(e.target.value)){
      const guess = [...this.state.guess];
      //If pareseInt fails because value is an empty string then set state to an empty string otherwise parse the value
      guess[index] = !isNaN(parseInt(e.target.value,10)) ? parseInt(e.target.value,10):'';
      this.setState({
        guess: guess
      });
    }
  }
  clearInput = (index, e) => {
    const guess = [...this.state.guess];
    guess[index] = '';
    
    this.setState({
      guess: guess
    });
  }
  checkGuess = (e) => {
    e.preventDefault();
    let {guess,turns,gameOver} = this.state;
    //If the user leaves something blank exit
    if(guess.includes('')){
      this.props.setMessage('Must have a guess in all positions');
      return;
    }
    let uniqueGuesses = Array.from(new Set(guess));
    let randomNumber = [...this.state.randomNumber];
    let result = {
      "rightPosition": 0,
      "wrongPosition": 0
    };

    //For each unique guess
    for(let uniqueGuess of uniqueGuesses){
      //if the number is in the random array
      if(randomNumber.includes(uniqueGuess)){
        //Get the position of where it is in the random array
        let positionInRandom = randomNumber.indexOf(uniqueGuess);
        //If the guess is in the same position as the position in random
        if(guess.indexOf(uniqueGuess,positionInRandom) === positionInRandom){
          result['rightPosition']++;
        }
        else{
          result['wrongPosition']++;
        }
      }
    }
    //Win
    if(result['rightPosition'] === 4){
      gameOver = 1;
    }
    //Lose
    if(turns.length === 9 && result.rightPosition !== 4){
      gameOver = 0;
    }
    this.setState({
      gameOver: gameOver,
      turns: [{
        guess: guess,
        result: result
        },
        ...turns]
    });
  }

  render() {
    const {guess, turns, gameOver, playerScores} = this.state;
    let view;
    if(gameOver >= 0){
      view = <GameOver 
              reset={this.reset} 
              turns={turns.length} 
              gameOver={gameOver} 
              setMessage={this.setMessage}
            />;
    }
    else{
      view = (
        <div className={styles.Content}>
          <GuessForm 
            guess={guess} 
            checkGuess={this.checkGuess} 
            handleChange={this.handleChange} 
            clearInput={this.clearInput}
          />
          <Turns turns={turns}/>
        </div>
      );
    }
    return (
      <div className={styles.Game}>
        {view}
        <LeaderBoard playerScores={playerScores}/>
      </div>
    );
  }
}

Game.propTypes = {
  setMessage: PropTypes.func.isRequired
};

export default Game;
