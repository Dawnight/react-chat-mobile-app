const mongoose = require('mongoose');
const User = mongoose.model('User');
const {CODE_OK, CODE_ERROR} = require('../config');
const {MD5PASSWORD} = require('../utils');

/** 过滤条件显示结果 **/
const __filter = {
  password: 0,
  __v: 0
};

/** 测试，查看node与mongoose的状态 **/
exports.getUserTest = async (ctx, next) => {
  let userList = await User.find({});
  ctx.body = userList;
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
exports.postUserRegister = async (ctx, next) => {
  const {userName, password, type} = ctx.request.body;
  
  let data = await User.findOne({userName}, __filter);
  if (data) {
    ctx.body = {
      code: CODE_ERROR,
      msg: '用户名重复',
    }
  } else {
    let user = new User({
      userName,
      type,
      password: MD5PASSWORD(password)
      
    });
    try {
      await user.save();
      ctx.body = {
        code: CODE_OK,
        msg: '注册成功',
        data: {userName, type},
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
exports.postUserLogin = async (ctx, next) => {
  console.log(ctx.request.body);
  const {userName, password} = ctx.request.body;
  let data = await User.findOne({userName, password: MD5PASSWORD(password)}, __filter);
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
