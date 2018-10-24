const chalk = require('chalk');
const utility = require('utility');

function log(info, color) {
  if (color) {
    console.log(chalk[color](info));
  } else {
    console.log(info);
  }
}

const MD5PASSWORD = password => {
  const salt = 'hello';
  return utility.md5(utility.md5(password + salt));
};

module.exports = {log, MD5PASSWORD};