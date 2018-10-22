import axios from 'axios';

export const CODE_OK = 0;

export function getCommonApi(url, params) {
  if (!params) {
    params = {};
  }
  return axios.get(url, {
    params: params
  }).then(response => {
    return Promise.resolve(response.data);
  }).catch(err => {
    return Promise.reject(err);
  });
}

export function postCommonApi(url, params) {
  if (!params) {
    params = {};
  }
  return axios.post(url, params).then(response => {
    return Promise.resolve(response.data);
  }).catch(err => {
    return Promise.reject(err);
  });
}
