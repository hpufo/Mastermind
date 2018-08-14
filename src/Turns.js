import React from 'react';
import './App.css';

const renderTurns = (turns) => {
  return turns.map((turn,i) => {
    let result = Object.assign({},turn.result);
    let pegs = [];
    let color;
    for(let i=0; i<4; i++){
      color = 'black';
      if(result.rightPosition){
        result.rightPosition--;
        color = 'red';
      }
      else if(result.wrongPosition){
        result.wrongPosition--;
        color = 'white';
      }
      pegs[i] = (<svg height="25" width="25" key={i}>
                  <circle cx="13" cy="13" r="10" stroke="black" strokeWidth="1" fill={color} key={i} />
                </svg>);
    }
    return (
      <div className="Turns" key={i}>
        <div className="Guess">{turn.guess.map((guess,i) => <div className="number" key={i}>{guess}</div>)}</div>
        <div className="Response">{pegs}</div>
      </div>
    );
  });
};
const Turns = (props) => {
  return (
    <div className="Turns">
      {renderTurns(props.turns)}
    </div>
  );
}

export default Turns;
