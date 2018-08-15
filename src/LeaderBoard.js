import React from 'react';
import styles from './scss/LeaderBoard.scss';

const renderHighScores = (playerScores) => {
  let topPlayers = playerScores.sort((a,b) => {
    if(a.score > b.score) return -1;
    else if(a.score < b.score) return 1;
    return 0;
  }).slice(0,10);

  return topPlayers.map((player, i) => (
    <li key={i}>
      <div className={styles.name}>{player.name}</div>
      <div className={styles.score}>{player.score}</div>
    </li>
  ));
};

const LeaderBoard = (props) => {
  return (
    <div className={styles.LeaderBoard}>
      <h1>Leader Board:</h1>
        {props.playerScores ? 
        <ol>
          {renderHighScores(props.playerScores)}
        </ol>
        :
        <h2>No scores to display</h2>}
    </div>
  );
}

export default LeaderBoard;
