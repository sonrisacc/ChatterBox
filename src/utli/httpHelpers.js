import axios from 'axios';

const URL = process.env.HEROKU_URL || 'http://localhost:1111';

export function pwdcheck(pwd, roomname) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}/auth/room`, {
        params: {
          roomname,
          password: pwd
        }
      })
      .then(res => {
        console.log('client side receive pwd check from server', res.data);
        resolve(res.data);
      })
      .catch(error => {
        console.error('Error:', error);
        reject(error);
      });
  });
}

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
