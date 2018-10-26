import * as ChatActionTypes from './ChatActionTypes';
import {getCommonApi, CODE_OK} from "src/utils";
import {errorMsg} from "store/User/UserCreateActions";

const getUserList = data => ({
  type: ChatActionTypes.USER_LIST,
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



