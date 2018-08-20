import axios from 'axios';

const url = 'https://thawing-scrubland-62997.herokuapp.com/api/';

export const getScores = () => {
  return axios.get(`${url}players`)
    .then(res => {
      //Return top scores
      return res.data.sort((a,b) => {
        if(a.score > b.score) return -1;
        else if(a.score < b.score) return 1;
        return 0;
      }).slice(0,10);
    })
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