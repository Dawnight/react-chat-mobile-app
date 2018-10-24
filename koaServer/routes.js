const Router = require('koa-router');
const User = require('./routes/UserRoute');
const Chat = require('./routes/ChatRoute');

module.exports = () => {
  const router = new Router({});
  
  /** USER **/
  router.get('/user/:name', User.getUserInfo);
  
  
  /** CHAT **/
  router.get('/chat/:info', Chat.getChatInfo);
  
  return router;
};
