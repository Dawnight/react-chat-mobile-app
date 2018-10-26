import * as UserActionTypes from './UserActionTypes';
import {getRedirectPath} from "src/utils";

const defaultState = {
  msg: '',
  isAuth: false,
  userName: '',
  password: '',
  avatar: '',
  type: '',
  redirectTo: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case UserActionTypes.REGISTER_SUCCESS:
      console.log('REGISTER_SUCCESS action');
      console.log(action);
      return {
        ...state,
        isAuth: true,
        redirectTo: getRedirectPath(action.data),
        msg: '',
        ...action.data,
      };
    case UserActionTypes.LOGIN_SUCCESS:
      console.log('LOGIN_SUCCESS action');
      console.log(action);
      return {
        ...state,
        isAuth: true,
        redirectTo: getRedirectPath(action.data),
        msg: '',
        ...action.data,
      };
    case UserActionTypes.ERROR_MSG:
      console.log('ERROR_MSG action');
      console.log(action);
      return {
        ...state,
        isAuth: false,
        msg: action.msg,
      };
    case UserActionTypes.LOAD_DATA:
      console.log('LOAD_DATA action');
      console.log(action);
      return {
        ...state,
        ...action.data,
        isAuth: true,
      };
    case UserActionTypes.UPDATE_SUCCESS:
      console.log('UPDATE_SUCCESS action');
      console.log(action);
      const data = action.data || {};
      return {
        ...state,
        msg: '',
        ...data,
        redirectTo: getRedirectPath(action.data),
      };
    default:
      return state;
  }
}