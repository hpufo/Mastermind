import React, { Component } from 'react';
import GuessForm from './GuessForm';
import Turns from './Turns';
import {getScores} from './service/api';
import LeaderBoard from './LeaderBoard';
import GameOver from './GameOver';
import styles from './scss/Game.scss';
//Check multiple wins
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
    randomIndex = Math.floor(Math.random() * (uniqueNumbers.length-0) + 0);
    randomNumber[i] = uniqueNumbers.splice(randomIndex,1)[0];
  }
  console.log('random number: '+randomNumber.join(''));
  return randomNumber;
}

class Game extends Component {
  state = initalState;

  componentDidMount(){
    getScores()
    .then((scores) => {
      this.setState({
        randomNumber: generateNumber(),
        playerScores: scores
      });
    })
    .catch((e) => {
      //Maybe print something to the user too?
      console.log(e.message);
      this.setState({
        randomNumber: generateNumber()
      });
    });
    
  }
  reset = () => {
    //Call get scores to update the top scores
    getScores()
      .then(scores => {
        this.setState(Object.assign({},initalState,{
          randomNumber: generateNumber(), playerScores: scores
        }));
      })
      .catch(e => {
        this.setState(initalState); //If it fails for whatever reason 
      });
  }
  handleChange = (index, e) => {
    if(/^[0-9]?$/.test(e.target.value)){
      const guess = [...this.state.guess];
      //If pareseInt fails because value is an empty string then set state to an empty string
      guess[index] = parseInt(e.target.value,10) || '';
      this.setState({
        guess: guess
      });
    }
  }
  checkGuess = (e) => {
    e.preventDefault();
    let {guess,turns,gameOver} = this.state;
    //If the user leaves something blank exit
    if(guess.includes('')){
      //Todo: Display message
      //Exit
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
      turns: [...turns,{
        guess: guess,
        result: result
      }]
    });
  }

  render() {
    const {guess, turns, gameOver, playerScores} = this.state;
    let view;
    if(gameOver >= 0){
      view = <GameOver reset={this.reset} turns={turns.length} gameOver={gameOver} />;
    }
    else{
      view = (
        <div>
          <GuessForm guess={guess} checkGuess={this.checkGuess} handleChange={this.handleChange}/>
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

export default Game;
