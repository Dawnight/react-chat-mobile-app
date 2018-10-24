const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getUserInfo = async (ctx, next) => {
  let user = await User.findOne({userName: 'mark'});
  if (!user) {
    user = new User({
      userName: 'MARK',
      password: 'MARK PASSWORD',
      type: 'BOSS',
      title: 'A COMPANY BOSS',
      desc: 'VERY RICH',
      meta: {
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
    });
    console.log('user');
    console.log(user);
    try {
      user = await user.save();
    } catch (e) {
      return (ctx.body = {
        success: false
      })
    }
    
  }
};
