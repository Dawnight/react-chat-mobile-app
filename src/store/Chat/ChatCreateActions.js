import * as ChatActionTypes from './ChatActionTypes';
import {getCommonApi, CODE_OK} from "src/utils";
import {errorMsg} from "store/User/UserCreateActions";
import io from 'socket.io-client';
import {postCommonApi} from "../../utils";

const socket = io('ws://localhost:9999');

const getUserList = data => ({
  type: ChatActionTypes.USER_LIST,
  data,
});

const getMessageList = (data, userId, users) => {
  return {
    type: ChatActionTypes.MSG_LIST,
    data,
    userId,
    users,
  }
};

const receiveMessage = (data, userId) => ({
  type: ChatActionTypes.MSG_RECEIVE,
  data,
  userId,
});

export const getUserListProps = param => {
  return dispatch => {
    getCommonApi('/user/list', param).then(response => {
      if (response.code === CODE_OK) {
        dispatch(getUserList(response.data));
      } else {
        dispatch(errorMsg(response.msg));
      }
    })
  }
};

export const getMessageListProps = () => {
  return (dispatch, getState) => {
    getCommonApi('/user/msgList').then(response => {
      if (response.code === CODE_OK) {
        const userId = getState().user._id;
        dispatch(getMessageList(response.data, userId, response.users));
      }
    })
  }
};

export const sendMessageProps = param => {
  console.group('%csendMessageProps', 'color: green;');
  console.log(param);
  console.groupEnd();
  return dispatch => {
    socket.emit('sendMsg', param);
  }
};

export const receiveMessageProps = () => {
  return (dispatch, getState) => {
    socket.on('receiveMsg', data => {
      console.group('%creceiveMessageProps', 'color: green;');
      console.log(data);
      console.groupEnd();
      const userId = getState().user._id;
      dispatch(receiveMessage(data, userId));
    })
  }
};

const readMessage = (from, userId, num) => {
  return {
    type: ChatActionTypes.MSG_READ,
    data: {from, userId, num},
  }
};

export const readMessageProps = from => {
  let param = {};
  param.from = from;
  return (dispatch, getState) => {
    postCommonApi('/user/readMsg', param).then(response => {
      if (response.code === CODE_OK) {
        const userId = getState().user._id;
        const num = response.data.num;
        dispatch(readMessage(from, userId, num));
      }
    })
  }
};