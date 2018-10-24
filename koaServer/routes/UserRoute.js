const mongoose = require('mongoose');
const User = mongoose.model('User');
const {CODE_OK, CODE_ERROR} = require('../config');

/** 过滤条件显示结果 **/
const __filter = {
  password: 0,
  __v: 0
};

/** 测试，查看node与mongoose的状态 **/
exports.getUserTest = async (ctx, next) => {
  let user = await User.findOne({userName: 'mark'});
  if (!user) {
    user = new User({
      userName: 'SHERRY',
      password: 'SHERRY PASSWORD',
      type: 'genius',
      title: 'A COMPANY genius',
      desc: 'VERY RICH',
      meta: {
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
    });
    try {
      await user.save();
    } catch (e) {
      return (ctx.body = {
        success: false
      })
    }
    
  }
};

exports.getUserInfo = async (ctx, next) => {
  ctx.body = {
    code: CODE_OK,
  }
};

/** 查看所有用户列表 **/
exports.getUserList = async (ctx, next) => {
  const {type} = ctx.query;
  let data = await User.find({type}, __filter);
  if (data) {
    ctx.body = {
      code: CODE_OK,
      data,
    };
  } else {
    ctx.body = {
      code: CODE_ERROR,
      msg: '服务端错误',
    };
  }
};

/** 用户修改信息 **/
exports.updateUserInfo = async (ctx, next) => {

};

/** 用户注册 **/
exports.userRegister = async (ctx, next) => {
  const {userName, password, type} = ctx.body;
  console.log('userName: ', userName);
  console.log('password: ', password);
  console.log('type: ', type);
  let data = await User.findOne({userName}, __filter);
  if (data) {
    ctx.body = {
      code: CODE_OK,
      msg: '用户名重复',
    }
  } else {
    let user = new User({
      userName,
      password,
      type,
    });
    try {
      await user.save();
      ctx.body = {
        code: CODE_OK,
        msg: '注册成功',
      }
    } catch (e) {
      return (ctx.body = {
        code: CODE_ERROR,
        msg: '服务器错误',
      })
    }
  }
};
/** 用户登录 **/
exports.userLogin = async (ctx, next) => {
  const {userName, password} = ctx.body;
  let data = await User.findOne({userName, password}, __filter);
  if (!data) {
    ctx.body = {
      code: CODE_ERROR,
      msg: '用户名或密码错误',
    }
  } else {
    ctx.body = {
      code: CODE_OK,
      data,
    }
  }
};
