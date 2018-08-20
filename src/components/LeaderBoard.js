import React from 'react';
import PropTypes from 'prop-types';
import styles from '../scss/LeaderBoard.scss';

const renderHighScores = (playerScores) => {
  return playerScores.map((player, i) => (
    <li className={styles.Row} key={i}>
      <div className={styles.Number}>{i+1})</div>
      <div className={styles.Name}>{player.name}</div>
      <div className={styles.Score}>{player.score}</div>
    </li>
  ));
};

const LeaderBoard = (props) => {
  return (
    <div className={styles.LeaderBoard}>
      <h1>Leader Board</h1>
        {props.loading ? 
        <p>loading...</p>
        :
        <ol className={styles.List}>
          {renderHighScores(props.playerScores)}
        </ol>}
    </div>
  );
}

LeaderBoard.propTypes = {
  playerScores: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    _id: PropTypes.string
  })).isRequired,
  loading: PropTypes.bool.isRequired
};

export default LeaderBoard;
