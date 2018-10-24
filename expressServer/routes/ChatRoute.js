const express = require('express');
const mongoose = require('mongoose');
const ChatRouter = express.Router();
const User = mongoose.model('User');

ChatRouter.get('/user', (req, res, next) => {
  User.find({}).exec((err, leads) => {
    res.json(leads);
  });
  
});

ChatRouter.get('/chat', (req, res, next) => {
  res.json({});
});

module.exports = ChatRouter;
