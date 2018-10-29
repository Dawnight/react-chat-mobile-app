const Koa = require('koa');
const logger = require('koa-logger');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const IO = require('koa-socket');
const {log} = require('./utils');
const mongoose = require('mongoose');

let app = new Koa();
const PORT = 9999;

/** mongoose START **/
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

const Chat = mongoose.model('Chat');

// http和socket一起使用
const io = new IO({
  ioOptions: {
    pingTimeout: 10000,
    pingInterval: 5000
  }
});

io.attach(app);
// console.log(io);
app._io.on('connection', async (socket) => {
  log('>>>>>>>>>>>>>>> connection success >>>>>>>>>>>>>>>', 'green');
  socket.on('sendMsg', async res => {
    log('sendMsg', 'green');
    console.log(res);
    const {from, to, content} = res;
    const chatId = [from, to].sort().join('_');
    let chat = await Chat.create({chatId, from, to, content});
    app._io.emit('receiveMsg', Object.assign({}, chat._doc));
    log('receiveMsg');
    console.log(res);
  });
});


io.on('error', function (err) {
  console.log(err);
});

/** 中间件 START **/
app.use(logger());
app.use(json());
app.use(bodyParser());
const sessionConfig = {
  key: 'koa:sess', //默认
  maxAge: 86400000,//[需要设置]
  overwrite: true,//覆盖，无效
  httpOnly: false,
  signed: true,//签名，默认true
  rolling: false,  //每次请求强制设置session
  renew: true,//快过期的时候的请求设置session[需要设置]
};
app.keys = ['hello, koa2'];
app.use(session(sessionConfig, app));
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