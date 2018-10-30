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
  _id: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case UserActionTypes.REGISTER_SUCCESS:
      console.group('%cREGISTER_SUCCESS action', 'color:red;');
      console.log(action);
      console.groupEnd();
      return {
        ...state,
        isAuth: true,
        redirectTo: getRedirectPath(action.data),
        msg: '',
        _id: action.data._id,
        ...action.data,
      };
    case UserActionTypes.LOGIN_SUCCESS:
      console.group('%cLOGIN_SUCCESS action', 'color:red');
      console.log(action);
      console.groupEnd();
      return {
        ...state,
        isAuth: true,
        redirectTo: getRedirectPath(action.data),
        msg: '',
        _id: action.data._id,
        ...action.data,
      };
    case UserActionTypes.ERROR_MSG:
      console.group('%cERROR_MSG action', 'color:red');
      console.log(action);
      console.groupEnd();
      return {
        ...state,
        isAuth: false,
        msg: action.msg,
      };
    case UserActionTypes.LOAD_DATA:
      console.group('%cLOAD_DATA action', 'color:red');
      console.log(action);
      console.groupEnd();
      return {
        ...state,
        ...action.data,
        isAuth: true,
        _id: action.data._id,
      };
    case UserActionTypes.UPDATE_SUCCESS:
      console.group('%cUPDATE_SUCCESS action', 'color:red');
      console.log(action);
      console.groupEnd();
      const data = action.data || {};
      return {
        ...state,
        msg: '',
        ...data,
        redirectTo: getRedirectPath(action.data),
        _id: action.data._id,
      };
    case UserActionTypes.LOGOUT:
      return {defaultState, redirectTo: '/login'};
    default:
      return state;
  }
}