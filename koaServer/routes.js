const Router = require('koa-router');
const User = require('./routes/UserRoute');
const Chat = require('./routes/ChatRoute');

module.exports = () => {
  const router = new Router({});
  
  /** USER **/
  router.get('/user/addUser', User.getUserInfo);
  router.get('/user/list', User.getUserList);
  router.post('/user/login', User.userLogin);
  router.post('/user/register', User.userRegister);
  
  /** CHAT **/
  router.get('/chat/info', Chat.getChatInfo);
  
  return router;
};
