import { SET_LOGIN_USERNAME, ADD_API_DATA } from './actions';

export function setLoginUserName(loginUsername) {
  return { type: SET_LOGIN_USERNAME, payload: loginUsername };
}

export function addAPIData(apiData) {
  return { type: ADD_API_DATA, payload: apiData };
}

export function getApiDetails() {
  return dispatch => {
    fetch('http://localhost:8080/api/history', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log('get request res', res);
        dispatch(addAPIData(res));
      })
      .catch(error => console.error('Error:', error));
  };
}
