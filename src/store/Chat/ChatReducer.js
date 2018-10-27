import * as ChatActionTypes from './ChatActionTypes';

const defaultState = {
  userList: [],
  chatMsg: [],
  unRead: 0,
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
    case ChatActionTypes.MSG_LIST:
      return {
        ...state,
        chatMsg: action.data,
        unRead:action.data.filter(k=>!k.read).length,
      };
    case ChatActionTypes.MSG_READ:
      return {};
    case ChatActionTypes.MSG_RECEIVE:
      return {};
    default:
      return state;
  }
}