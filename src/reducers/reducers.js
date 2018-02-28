import { combineReducers } from 'redux';
import { SET_LOGIN_USERNAME, ADD_API_DATA } from '../actions/actions';

const loginUsername = (state = '', action) => {
  if (action.type === SET_LOGIN_USERNAME) {
    return action.payload;
  }
  return state;
};

const apiData = (state = [], action) => {
  if (action.type === ADD_API_DATA) {
    return [...action.payload];
  }
  return state;
};
const rootReducer = combineReducers({ loginUsername, apiData });

export default rootReducer;
