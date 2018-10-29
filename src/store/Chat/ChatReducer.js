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
      console.log('MSG_RECEIVE action');
      console.log(action);
      console.log('MSG_RECEIVE state');
      console.log(state);
      return {
        ...state,
        chatMsg: [...state.chatMsg, action.data],
        unRead: state.unRead + 1,
      };
    case ChatActionTypes.MSG_READ:
      return {};
    default:
      return state;
  }
}