const express = require('express');
const mongoose = require('mongoose');
const ChatRouter = express.Router();

// const {CODE_OK} = require('../config');
const User = mongoose.model('Chat');

ChatRouter.get('/', (req, res, next) => {
  res.json({user: 'chat'});
});

module.exports = ChatRouter;
