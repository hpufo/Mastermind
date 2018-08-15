import axios from 'axios';

const url = 'https://thawing-scrubland-62997.herokuapp.com/api/';

export const getScores = () => {
  return axios.get(`${url}players`)
    .then(res => res.data)
    .catch(e => {
      throw e;
    });
};

export const saveScore = (name, score) => {
  const data = {
    name: name,
    score: score
  };
  return axios.post(`${url}players`,data)
  .then(res => res.data)
  .catch(e => {
    throw e
  });
}