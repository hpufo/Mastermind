import React from 'react';
import styles from '../scss/GuessForm.scss';

const GuessForm = (props) => {
  let inputs = [];
  for(let i=0; i<4; i++){
    inputs[i] = <input type="text" onChange={props.handleChange.bind(this,i)} value={props.guess[i]} className={styles.Input} key={i} />;
  }

  return (
    <form className={styles.Guess} onSubmit={props.checkGuess}>
      {inputs}
      <input type="submit" className={styles.Button} value="Submit" />
    </form>
  );
}

export default GuessForm;