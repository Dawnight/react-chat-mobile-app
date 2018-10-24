const Koa = require('koa');
const logger = require('koa-logger');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');

let app = new Koa();
const PORT = 4399;

/** mongoose START **/
const mongoose = require('mongoose');
const {log} = require('./utils');
const {MONGODB} = require('./config');
const DB_URL = `${MONGODB.prefix}${MONGODB.host}:${MONGODB.port}/${MONGODB.databaseName}`;

mongoose.Promise = global.Promise;

mongoose.set('debug', true);

mongoose.connect(DB_URL, {useNewUrlParser: true});

mongoose.connection.on('error', () => {
  log(`MongoDB Connected error...`, 'red');
});

mongoose.connection.on('disconnected', () => {
  log(`MongoDB Disconnected...`, 'red');
});

mongoose.connection.once('open', () => {
  log(`MongoDB Connected Successfully...`, 'green');
});

require('./schemas/UserSchema');
require('./schemas/ChatSchema');
/** mongoose END **/

/** 中间件 START **/
app.use(logger());
app.use(json());
app.use(bodyParser());
/** 中间件 END **/

/** 路由 START **/
const router = require('./routes')();
app.use(router.routes()).use(router.allowedMethods());
/** 路由 END **/

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`the server is running at localhost:${PORT}`);
  }
});