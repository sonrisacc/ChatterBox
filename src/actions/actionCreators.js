import { SET_LOGIN_USERNAME } from './actions';

export function setLoginUserName(loginUsername) {
  return { type: SET_LOGIN_USERNAME, payload: loginUsername };
}
