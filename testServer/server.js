const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 9999;

const userRouter = require('./routes/user');

app.use(morgan('dev'));
app.use('/user', userRouter);

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`the server is running at localhost:${PORT}`);
  }
});
