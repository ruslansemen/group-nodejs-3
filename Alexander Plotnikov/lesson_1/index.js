const chalk = require('chalk');
const colors = require('./modules/colors')


colors.forEach(e => {
    console.log(chalk[e](e))
})