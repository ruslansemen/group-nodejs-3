const chalk = require('chalk')
const beepbeep = require('beepbeep')

const log = console.log
log(chalk.white.bgRed.bold('Hello') + chalk.underline.bgBlue(' World') + chalk.red('!'))
log(`
    CPU: ${chalk.red('90%')}
    RAM: ${chalk.green('40%')}
    DISK: ${chalk.yellow('70%')}
`)

beepbeep(3, 1000)
