const {resolve} = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const glob = require('glob');
const bodyParser = require('body-parser');

const {log} = require('./utils');
const {MONGODB} = require('./config');

const app = express();
const PORT = 9999;

const DB_URL = `${MONGODB.prefix}${MONGODB.host}:${MONGODB.port}/${MONGODB.databaseName}`;

// 先对schema进行注册，然后再使用路由
initSchemas();

const userRouter = require('./routes/UserRoute');
const ChatRouter = require('./routes/ChatRoute');

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/user', userRouter);
app.use('/chat', ChatRouter);

connect();

function connect() {
  mongoose.connect(DB_URL, {useNewUrlParser: true});

  mongoose.connection.on('error', () => {
    log(`MongoDB Connected error...`, 'red');
  });

  mongoose.connection.on('disconnected', () => {
    log(`MongoDB Disconnected...`, 'red');
  });

  mongoose.connection.once('open', listen);

  log(`MongoDB Connected Successfully...`, 'green');
}

function initSchemas() {
  glob.sync(resolve(__dirname, './schemas/', '**/*.js')).forEach(elem => {
    console.log(elem);
    require(elem);
  });
}

function listen() {
  app.listen(PORT, err => {
    if (err) {
      console.log(err);
    } else {
      log(`the server is running at localhost:${PORT}`, 'green');
    }
  });
}

