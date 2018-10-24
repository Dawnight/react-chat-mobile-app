const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getChatInfo = async (ctx, next) => {
  User.find().exec((err, leads) => {
    if (err) {
      console.log(err);
    } else {
      console.log(leads);
    }
  });
  let info = ctx.params.info;
  ctx.body = `hello, ${info}`;
};
