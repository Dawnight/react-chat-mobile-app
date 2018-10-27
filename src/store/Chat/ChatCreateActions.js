import * as ChatActionTypes from './ChatActionTypes';
import {getCommonApi, CODE_OK} from "src/utils";
import {errorMsg} from "store/User/UserCreateActions";
import io from 'socket.io-client';

const socket = io('ws://localhost:9999');

const getUserList = data => ({
  type: ChatActionTypes.USER_LIST,
  data,
});

const getMessageList = (data, userId) => {
  console.log('data, userId');
  console.log(data, userId);
  return {
    type: ChatActionTypes.MSG_LIST,
    data,
    userId,
  }
};

const receiveMessage = (data) => ({
  type: ChatActionTypes.MSG_RECEIVE,
  data,
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
        console.log('/user/msgList');
        console.log(response.data);
        const userId = getState().user._id;
        dispatch(getMessageList(response.data, userId));
      }
    })
  }
};

export const sendMessageProps = param => {
  console.log('sendMessageProps');
  console.log(param);
  return dispatch => {
    socket.emit('sendMsg', param);
  }
};

export const receiveMessageProps = () => {
  return dispatch => {
    socket.on('receiveMsg', data => {
      console.log('receiveMessageProps');
      console.log(data);
      dispatch(receiveMessage(data));
    })
  }
};
