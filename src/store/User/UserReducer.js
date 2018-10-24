import * as UserActionTypes from './UserActionTypes';
import {getRedirectPath} from "src/utils";

const defaultState = {
  msg: '',
  isAuth: false,
  userName: 'mark',
  password: '',
  type: '',
  redirectTo: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case UserActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        redirectTo: getRedirectPath(action),
        msg: '',
        ...action.data,
      };
    case UserActionTypes.ERROR_MSG:
      return {
        ...state,
        isAuth: false,
        msg: action.msg,
      };
    default:
      return state;
  }
}