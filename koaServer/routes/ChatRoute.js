const mongoose = require('mongoose');
const Chat = mongoose.model('Chat');

/** 过滤条件显示结果 **/
const __filter = {
  password: 0,
  __v: 0
};

/** 测试，查看node与mongoose的状态 **/
exports.getChatInfo = async (ctx, next) => {
  let chat = await Chat.findOne({chatId: '104'}, __filter);
  if (!chat) {
    chat = new Chat({
      chatId: '104',
      from: 'MARK',
      to: 'SHERRY',
      read: false,
      content: 'hello, sherry, where are you now?',
      meta: {
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
    });
    console.log(chat);
    try {
      await chat.save();
      ctx.body = chat;
    } catch (e) {
      return (ctx.body = {
        success: false
      });
    }
  }
};
