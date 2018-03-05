import axios from 'axios';
import { SET_LOGIN_USERNAME, ADD_API_DATA, ADD_API_ROOM_DATA } from './actions';

const URL = process.env.HEROKU_URL || 'http://localhost:8080';

export function setLoginUserName(loginUsername) {
  return { type: SET_LOGIN_USERNAME, payload: loginUsername };
}

export function addAPIData(apiData) {
  return { type: ADD_API_DATA, payload: apiData };
}

export function addAPIRoomData(apiData) {
  return { type: ADD_API_ROOM_DATA, payload: apiData };
}

export function getApiDetails(roomName) {
  console.log('hmmmm', roomName);
  return dispatch => {
    axios
      .get(`${URL}/api/history`, {
        params: {
          room: roomName
        }
      })
      .then(res => {
        console.log('get request res', res.data);
        dispatch(addAPIData(res.data));
      })
      .catch(error => console.error('Error:', error));
  };
}

export function getApiRoomDetails() {
  console.log('hmmmm getting rooms');
  return dispatch => {
    axios
      .get(`${URL}/api/rooms`)
      .then(res => {
        console.log('get room request res', res.data);
        dispatch(addAPIRoomData(res.data));
      })
      .catch(error => console.error('Error:', error));
  };
}
