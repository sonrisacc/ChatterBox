import axios from 'axios';
import { SET_LOGIN_USERNAME, ADD_API_DATA } from './actions';

const URL = process.env.HEROKU_URL || 'http://localhost:8080';

export function setLoginUserName(loginUsername) {
  return { type: SET_LOGIN_USERNAME, payload: loginUsername };
}

export function addAPIData(apiData) {
  return { type: ADD_API_DATA, payload: apiData };
}

export function getApiDetails() {
  return dispatch => {
    axios
      .get(`${URL}/api/history`)
      .then(res => {
        console.log('get request res', res.data);
        dispatch(addAPIData(res.data));
      })
      .catch(error => console.error('Error:', error));
  };
}
