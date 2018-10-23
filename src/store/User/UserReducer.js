import * as UserActionTypes from './UserActionTypes';

const defaultState = {
  msg: '',
  isAuth: false,
  userName: 'mark',
  password: '',
  type: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case UserActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isAuth: true,
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