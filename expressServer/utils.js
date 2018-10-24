const chalk = require('chalk');

function log(info, color) {
  if (color) {
    console.log(chalk[color](info));
  } else {
    console.log(info);
  }
}

module.exports = {log};