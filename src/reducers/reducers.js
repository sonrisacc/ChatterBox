import { combineReducers } from 'redux';
import { SET_LOGIN_USERNAME } from '../actions/actions';

const loginUsername = (state = '', action) => {
  if (action.type === SET_LOGIN_USERNAME) {
    return action.payload;
  }
  return state;
};

const rootReducer = combineReducers({ loginUsername });

export default rootReducer;
