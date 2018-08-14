import React from 'react';

const GuessForm = (props) => {
  let inputs = [];
  for(let i=0; i<4; i++){
    inputs[i] = <input type="text" onChange={props.handleChange.bind(this,i)} key={i} />;
  }

  return (
    <form className="Guess" onSubmit={props.checkGuess}>
      {inputs}
      <input type="submit" value="Submit" />
    </form>
  );
}

export default GuessForm;
