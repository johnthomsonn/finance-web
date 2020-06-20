const chalk = require('chalk')

exports.debug = msg => console.log(chalk.blue("[Debug] " +msg))
exports.warning = msg => console.log(chalk.yellow("[Warning] " +msg))
exports.error = msg => console.log(chalk.red("[Error] " + msg))
exports.info = msg => console.log(chalk.green("[Info] " + msg))
