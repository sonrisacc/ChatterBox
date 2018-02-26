import { SET_LOGIN_USERNAME } from '../actions/actions';

const DEFAULT_STATE = {
  LOGIN_USERNAME: ''
};

const setLoginUserName = (state, action) =>
  Object.assign([], state, { loginUsername: action.payload });

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_LOGIN_USERNAME:
      return setLoginUserName(state, action);
    default:
      return state;
  }
};

export default rootReducer;
