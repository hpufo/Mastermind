import React from 'react';
import styles from './scss/LeaderBoard.scss';
import {getScores} from './service/api';

const renderHighScores = () => {
  
};

const LeaderBoard = (props) => {
  return (
    <div className={styles.LeaderBoard}>
      <h1>Leader Board:</h1>
    </div>
  );
}

export default LeaderBoard;
