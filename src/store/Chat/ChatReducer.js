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
      console.log('MSG_LIST action');
      console.log(action);
      return {
        ...state,
        chatMsg: action.data,
        unRead: action.data.filter(k => !k.read).length,
      };
    case ChatActionTypes.MSG_RECEIVE:
      return {
        ...state,
        chatMsg: [...state.chatMsg, action.data.chatMsg]
      };
    case ChatActionTypes.MSG_READ:
      return {};
    default:
      return state;
  }
}