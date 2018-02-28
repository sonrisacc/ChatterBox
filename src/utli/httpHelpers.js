import axios from 'axios';

const URL = process.env.HEROKU_URL || 'http://localhost:8080';

export function checkUserNameExistence(name) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}/auth`, {
        params: {
          userName: name
        }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        console.error('Error:', error);
        reject(error);
      });
  });
}

export function signUpUser(name) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${URL}/auth`, {
        userName: name
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        console.error('Error:', error);
        reject(error);
      });
  });
}
