const express = require('express');
const userRouter = express.Router();

const {CODE_OK} = require('../config');

userRouter.get('/info', (req, res, next) => {
  res.json({code: 1});
});

module.exports = userRouter;
