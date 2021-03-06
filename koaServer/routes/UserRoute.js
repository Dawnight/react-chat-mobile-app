const mongoose = require('mongoose');
const User = mongoose.model('User');
const Chat = mongoose.model('Chat');
const {CODE_OK, CODE_ERROR} = require('../config');
const {MD5PASSWORD} = require('../utils');

/** 过滤条件显示结果 **/
const __filter = {
  password: 0,
  __v: 0
};

/** /user/test 查看数据表中所有的数据信息 **/
exports.getUserTest = async (ctx, next) => {
  ctx.body = await User.find({});
};

/** /user/info AuthRoute页面获取cookie验证信息 **/
exports.getUserInfo = async (ctx, next) => {
  const userID = ctx.cookies.get('userID');
  if (!userID) {
    ctx.body = {
      code: CODE_ERROR,
      msg: 'no cookie'
    };
  } else {
    let data = await User.findOne({_id: userID}, __filter);
    if (data) {
      ctx.body = {
        code: CODE_OK,
        msg: 'get user info success',
        data,
      };
    } else {
      ctx.body = {
        code: CODE_ERROR,
        msg: 'get user info failed'
      };
    }
  }

};

/** /user/list 查看所有用户type列表 **/
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

/** /user/register 用户注册 **/
exports.postUserRegister = async (ctx, next) => {
  const {userName, password, type} = ctx.request.body;

  let data = await User.findOne({userName}, __filter);
  if (data) {
    ctx.body = {
      code: CODE_ERROR,
      msg: '用户名重复',
    };
  } else {
    let user = new User({
      userName,
      type,
      password: MD5PASSWORD(password)

    });
    try {
      let data = await user.save();
      let id = data._id.toString();
      ctx.cookies.set(
        'userID',
        id,
        {
          domain: 'localhost',  // 写cookie所在的域名
          path: '/',       // 写cookie所在的路径
          maxAge: 24 * 60 * 60 * 1000, // cookie有效时长
          expires: new Date('2019-02-15'),  // cookie失效时间
          httpOnly: true,  // 是否只用于http请求中获取
          overwrite: false  // 是否允许重写
        }
      );
      ctx.body = {
        code: CODE_OK,
        msg: '注册成功',
        data: {
          userName: data.userName,
          type: data.type,
        },
      }
    } catch (e) {
      return (ctx.body = {
        code: CODE_ERROR,
        msg: '服务器错误',
      })
    }
  }
};

/** /user/login 用户登录 **/
exports.postUserLogin = async (ctx, next) => {
  const {userName, password} = ctx.request.body;
  let data = await User.findOne({userName, password: MD5PASSWORD(password)}, __filter);
  if (!data) {
    ctx.body = {
      code: CODE_ERROR,
      msg: '用户名或密码错误',
    }
  } else {
    let id = data._id.toString();
    ctx.cookies.set(
      'userID',
      id,
      {
        domain: 'localhost',  // 写cookie所在的域名
        path: '/',       // 写cookie所在的路径
        maxAge: 24 * 60 * 60 * 1000, // cookie有效时长
        expires: new Date('2019-02-15'),  // cookie失效时间
        httpOnly: true,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
      }
    );
    ctx.body = {
      code: CODE_OK,
      data,
    }
  }
};

/** 用户更新信息 **/
exports.postUpdateUserInfo = async (ctx, next) => {
  const userID = ctx.cookies.get('userID');
  if (!userID) {
    ctx.body = {
      code: CODE_ERROR,
      msg: 'no cookie'
    };
  }
  const data = ctx.request.body;

  try {
    let res = await User.findByIdAndUpdate(userID, data);
    ctx.body = {
      code: CODE_OK,
      data: {
        userName: res.userName,
        type: res.type,
        avatar: data.avatar,
        company: data.company,
        title: data.title,
        desc: data.desc,
      }
    };
  } catch (e) {
    ctx.body = {
      code: CODE_OK,
      msg: '未找到该用户'
    }
  }
};

/** 用户退出 **/
exports.postUserLogout = async (ctx, next) => {
  const userID = ctx.cookies.get('userID');
  if (userID) {
    try {
      let data = await User.findOne({_id: userID}, __filter);
      if (data) {
        ctx.cookies.set('userID', '', {signed: false, maxAge: 0});
        ctx.body = {
          code: CODE_OK,
          msg: 'clear cookie normal'
        };
      }
    } catch (e) {
      ctx.body = {
        code: CODE_ERROR,
        msg: 'catch error'
      };
    }
  } else {
    ctx.body = {
      code: CODE_ERROR,
      msg: 'clear cookie with error'
    };
  }
};

/** 用户查看聊天信息 **/
exports.getMessageList = async (ctx, next) => {
  const userID = ctx.cookies.get('userID');
  if (userID) {
    try {
      let user = await User.find({}, __filter);
      let users = {};
      user.forEach(item => {
        users[item._id] = {userName: item.userName, avatar: item.avatar}
      });

      let data = await Chat.find({$or: [{from: userID}, {to: userID}]}, __filter);
      if (data) {
        ctx.body = {
          code: CODE_OK,
          data,
          users,
        };
      }
    } catch (e) {
      ctx.body = {
        code: CODE_ERROR,
        msg: 'catch error'
      };
    }
  }
};

exports.postReadMessage = async (ctx, next) => {
  const userID = ctx.cookies.get('userID');
  const {from} = ctx.request.body;
  console.log(userID);
  console.log(from);
  try {
    let data = await Chat.update({from, to: userID}, {'$set': {read: true}}, {multi: true});
    console.log(data);
    ctx.body = {
      code: 0,
      data,
    }
  } catch (e) {
    ctx.body = {
      code: 1,
    }
  }

};
