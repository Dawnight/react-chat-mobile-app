const express = require('express');
const mongoose = require('mongoose');
const userRouter = express.Router();
const User = mongoose.model('User');

userRouter.get('/info', (req, res, next) => {
  res.json({code: 1});
});

userRouter.post('/register', (req, res, next) => {
  console.log(req.body);
  res.json({code: 1});
});

userRouter.get('/list', (req, res, next) => {
  res.json({'hello': "sdsds"})
});


module.exports = userRouter;
