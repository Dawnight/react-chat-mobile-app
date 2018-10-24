const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const PORT = 9999;

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
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
/** 中间件 END **/


/** 路由 START **/
const userRouter = require('./routes/UserRoute');
const ChatRouter = require('./routes/ChatRoute');

app.use('/user', userRouter);
app.use('/chat', ChatRouter);
/** 路由 END **/


app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`the server is running at localhost:${PORT}`);
  }
});
