const mongoose = require('mongoose');
const Chat = mongoose.model('Chat');

exports.getUserInfo = async (ctx, next) => {
  Chat.find().exec((err, leads) => {
    if (err) {
      console.log(err);
    } else {
      console.log(leads);
    }
  });
  let name = ctx.params.name;
  ctx.body = `hello, ${name}`;
};
