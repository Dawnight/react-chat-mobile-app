import * as UserActionTypes from './UserActionTypes';
import {getRedirectPath} from "src/utils";

const defaultState = {
  msg: '',
  isAuth: false,
  userName: '',
  password: '',
  type: '',
  redirectTo: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case UserActionTypes.REGISTER_SUCCESS:
      console.log('login action');
      console.log(action);
      return {
        ...state,
        isAuth: true,
        redirectTo: getRedirectPath(action.data),
        msg: '',
        ...action.data,
      };
    case UserActionTypes.LOGIN_SUCCESS:
      console.log('register action');
      console.log(action);
      return {
        ...state,
        isAuth: true,
        redirectTo: getRedirectPath(action.data),
        msg: '',
        ...action.data,
      };
    case UserActionTypes.ERROR_MSG:
      console.log('error message');
      console.log(action);
      return {
        ...state,
        isAuth: false,
        msg: action.msg,
      };
    case UserActionTypes.LOAD_DATA:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}