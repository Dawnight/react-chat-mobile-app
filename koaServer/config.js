const CODE_OK = 0;

const CODE_ERROR = 1;

const CODE_ERROR_MSG = '服务器错误';

const MONGODB = {
  "prefix": "mongodb://",
  "username": "",
  "password": "",
  "host": "localhost",
  "port": "27017",
  "databaseName": "chat",
};

module.exports = {CODE_OK, MONGODB, CODE_ERROR, CODE_ERROR_MSG};
