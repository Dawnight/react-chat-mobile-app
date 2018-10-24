import axios from 'axios';

export const CODE_OK = 0;

export function getCommonApi(url, params) {
  if (!params) {
    params = {};
  }
  return axios.get(url, {
    params: params
  }).then(response => {
    if (response.status === 200) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data);
    }
  }).catch(err => {
    return Promise.reject(err);
  });
}

export function postCommonApi(url, params) {
  if (!params) {
    params = {};
  }
  return axios.post(url, params).then(response => {
    if (response.status === 200) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data);
    }
  }).catch(err => {
    return Promise.reject(err);
  });
}

export function getRedirectPath({type, avatar}) {
  let url = '';
  if (type === 'boss') {
    url = '/boss';
  } else {
    url = '/genius';
  }
  if (!avatar) {
    url += 'info';
  }
  return url;
}