import * as ChatActionTypes from './ChatActionTypes';

const defaultState = {
  userList: [],
  chatMsg: [],
  unRead: 0,
  users: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ChatActionTypes.USER_LIST:
      console.group('%cUSER_LIST', 'color: red;');
      console.log(action);
      console.groupEnd();
      return {
        ...state,
        userList: action.data,
      };
    case ChatActionTypes.MSG_LIST:
      console.group('%cMSG_LIST action', 'color: red;');
      console.log(action);
      console.groupEnd();
      return {
        ...state,
        chatMsg: action.data,
        unRead: action.data.filter(k => !k.read && k.to===action.userId).length,
        users: action.users
      };
    case ChatActionTypes.MSG_RECEIVE:
      console.group('%cMSG_RECEIVE action', 'color: red;');
      console.log(action);
      console.groupEnd();
      console.group('%cMSG_RECEIVE state', 'color: red;');
      console.log(state);
      console.groupEnd();
      const n = action.to === action.userId ? 1: 0;
      return {
        ...state,
        chatMsg: [...state.chatMsg, action.data],
        unRead: state.unRead + 1 + n,
      };
    case ChatActionTypes.MSG_READ:
      return {};
    default:
      return state;
  }
}