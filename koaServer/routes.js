const Router = require('koa-router');
const User = require('./routes/UserRoute');
const Chat = require('./routes/ChatRoute');

module.exports = () => {
  const router = new Router({});
  
  /** USER **/
  router.get('/user/test', User.getUserTest);
  router.get('/user/info', User.getUserInfo);
  router.get('/user/list', User.getUserList);
  router.post('/user/login', User.postUserLogin);
  router.post('/user/register', User.postUserRegister);
  router.post('/user/update', User.postUpdateUserInfo);
  
  /** CHAT **/
  router.get('/chat/info', Chat.getChatInfo);
  
  return router;
};
