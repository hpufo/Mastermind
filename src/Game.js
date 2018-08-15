import React, { Component } from 'react';
import GuessForm from './GuessForm';
import Turns from './Turns';
import styles from './scss/Game.scss';

class Game extends Component {
  state = {
    randomNumber: [],
    turns: [],
    guess: ['','','',''],
    gameOver: false,
  }

  componentDidMount(){
    this.setState({randomNumber: this.generateNumber()});
  }
  generateNumber(){
    let uniqueNumbers = [0,1,2,3,4,5,6,7,8,9];
    let randomNumber = [];
    let randomIndex;
    for(let i=0; i<4; i++){
      randomIndex = Math.floor(Math.random() * (uniqueNumbers.length-0) + 0);
      randomNumber[i] = uniqueNumbers.splice(randomIndex,1)[0];
    }
    console.log(randomNumber.join(''));
    return randomNumber;
  }

  handleChange = (index, e) => {
    const guess = [...this.state.guess];
    guess[index] = parseInt(e.target.value,10);
    this.setState({
      guess: guess
    });
  }
  checkGuess = (e) => {
    e.preventDefault();
    let {guess,turns,gameOver} = this.state;
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
    if(turns.length === 9 && result.rightPosition !== 4){
      gameOver = true;
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
    if(this.state.gameOver) console.log('Game Over')
    return (
      <div className={styles.Game}>
        <GuessForm checkGuess={this.checkGuess} handleChange={this.handleChange}/>
        <Turns turns={this.state.turns}/>
      </div>
    );
  }
}

export default Game;
