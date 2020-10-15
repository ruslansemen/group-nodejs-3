const chalk = require("chalk")
const Strings = require("strings")
const strings = require("strings")
const log = console.log
log(`
CPU: ${chalk.red('30%')}
RAM: ${chalk.green('40%')}
DISK: ${chalk.blue('50%')}
`)
log(chalk.red(chalk.bold.magentaBright('Hello'), chalk.underline.bgBlue('world') + '!'))

let a = new Strings()
a.propstring('url', ':base/blog/posts/:basename:ext')
a.pattern('foo', {re:/(\d+)\D+(\d+)/})
let b = a.source('foo')
log(b)