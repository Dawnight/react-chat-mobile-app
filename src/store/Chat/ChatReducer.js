import * as ChatActionTypes from './ChatActionTypes';

const defaultState = {
  userList: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ChatActionTypes.USER_LIST:
      console.log('USER_LIST');
      console.log(action);
      return {
        ...state,
        userList: action.data,
      };
    default:
      return state;
  }
}