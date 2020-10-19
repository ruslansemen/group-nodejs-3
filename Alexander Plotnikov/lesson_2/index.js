const readline = require('readline')
const chalk = require('chalk')
const path = require('path')

const { statistic, round, start, task, error, writeToLog } = require('./src/functions')

let arg = process.argv.filter(e => /\-\-/.test(e))[0]

const link = path.join(__dirname, arg ? arg.replace(/\-\-/, '') : 'log.json')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

start()
task()

rl.on('line', async (input) => {
    if (input === 'exit') {
        rl.close()
    }
    else if (input === 'statistic') {
        try {
            await statistic(link)
        } catch (error) {
            console.log(chalk.red(error));
        }
    }
    else if (+input === 1 || +input === 2) {
        try {
            await writeToLog(link, round(+input))
        } catch (error) {
            console.log(chalk.red(error));
        }
        task()
    } else {
        error()
    }
})


