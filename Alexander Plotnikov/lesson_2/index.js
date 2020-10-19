const readline = require('readline');
const chalk = require('chalk');
const fs = require('fs')
const path = require('path')

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
        await statistic(link)
    }
    else if (+input === 1 || +input === 2) {
        await writeToLog(link, round(+input))
        task()
    } else {
        error()
    }
})



function start() { console.log(chalk.yellow('************* Welcome to the game heads and tails !!! ***********************')) }
function task() { console.log(chalk.magenta(`Input two numbers: 1 or 2. If you want to exit the game to input "exit"`)) }
function error() { console.log(chalk.red(`You inputed uncorrect value... You need to input 1 or 2... Try again `)) }
function rnd(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}
function round(numder) {
    let result = rnd(1, 2) === numder
    result ? console.log(chalk.green('You win!')) : console.log(chalk.red('You loose...'))
    return result
}


function read(link) {
    return new Promise((res, rej) => {
        fs.readFile(link, 'utf8', (err, data) => {
            if (err) rej(err)
            res(data)
        })
    })
}



function write(link, data) {
    return new Promise((res, rej) => {
        fs.writeFile(link, data, 'utf8', (err) => {
            err ? rej(err) : res()
        })
    })
}

async function writeToLog(link, result) {

    let log = await read(link)
    log = log ? JSON.parse(log) : []

    let newRecoding = {
        numberOfGames: log.length,
        result: result ? "win" : "loose",
    }

    log.push(newRecoding)

    await write(link, JSON.stringify(log))

}

async function statistic(link) {
    let log = await read(link)
    log = log ? JSON.parse(log) : []

    console.log("Total - ", log.length)
    console.log("Total of wins - ", log.reduce((accum, game) => game.result === "win" && accum + 1, 0))
    console.log("Total of looses - ", allQuantity - allWin)
    console.log("Ratio win/loose - ", allWin / (allLoose || 1))
}