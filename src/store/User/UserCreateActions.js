import * as UserActionTypes from './UserActionTypes';
import {postCommonApi, CODE_OK} from "src/utils";

export const errorMsg = msg => ({
  type: UserActionTypes.ERROR_MSG,
  msg,
});

const registerSuccess = data => ({
  type: UserActionTypes.REGISTER_SUCCESS,
  data,
});

const loginSuccess = data => ({
  type: UserActionTypes.LOGIN_SUCCESS,
  data,
});

const updateSuccess= data => {
  console.log('updateSuccess data');
  console.log(data);
  return {
    type: UserActionTypes.UPDATE_SUCCESS,
    data,
  }
};

const logoutSubmit = () => ({
  type: UserActionTypes.LOGOUT
});

export const register = userInfo => {
  const {userName, password, rePassword, type} = userInfo;
  if (!userName || !password || !type) {
    return errorMsg('用户名密码必须输入');
  }

  if (password !== rePassword) {
    return errorMsg('两次输入的密码不一致');
  }
  let param = {};
  param.userName = userName;
  param.password = password;
  param.type = type;
  return dispatch => {
    postCommonApi('/user/register', param).then(response => {
      if (response.code === CODE_OK) {
        dispatch(registerSuccess(response.data));
      } else {
        dispatch(errorMsg(response.msg));
      }
    });
  };
};

export const login = userInfo => {
  const {userName, password} = userInfo;
  if (!userName) {
    return errorMsg('请输入用户名');
  }
  if (!password) {
    return errorMsg('请输入密码');
  }
  let param = {};
  param.userName = userName;
  param.password = password;
  console.log('reducer login userinfo');
  console.log(userInfo);
  return dispatch => {
    postCommonApi('/user/login', param).then(response => {
      if (response.code === CODE_OK) {
        dispatch(loginSuccess(response.data));
      } else {
        dispatch(errorMsg(response.msg));
      }
    })
  };
};

export const loadData = userInfo => ({
  type: UserActionTypes.LOAD_DATA,
  data: userInfo,
  isAuth: true,
});

export const updateInfo = data => {
  return dispatch => {
    postCommonApi('/user/update', data).then(response => {
      if (response.code === CODE_OK) {
        dispatch(updateSuccess(response.data));
      } else {
        dispatch(errorMsg(response.msg));
      }
    })
  }
};

// logoutSubmitProps
export const logoutSubmitProps = () => {
  return dispatch => {
    postCommonApi('/user/logout').then(response => {
      if (response.code === CODE_OK) {
        dispatch(logoutSubmit(response.data));
      } else {
        dispatch(errorMsg(response.msg));
      }
    })
  }
};
