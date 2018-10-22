const express = require('express');
const userRouter = express.Router();

userRouter.get('/info', (req, res, next) => {
  res.json({'user': 'mark'})
});

module.exports = userRouter;
