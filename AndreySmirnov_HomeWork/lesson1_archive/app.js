const chalk = require('chalk')
const log = console.log
const beeper = require('beeper')

module.exports = calc = (value) => {
    log(chalk.blue('calculation...'))
    setTimeout(() => {
        console.log('preparing data...')
        setTimeout(() =>{
            beeper(log(chalk.bold.underline.red('Result: ' + chalk.black.bgWhite(value**2))))
        },2000 )
    }, 2000)
}