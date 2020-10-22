const chalk = require('chalk');
const fs = require('fs')


function start() { console.log(chalk.yellow('************* Welcome to the game heads and tails !!! ***********************')) }

function task() {
    console.log(chalk.green(`Input two numbers: 1 or 2.`))
    console.log(chalk.green(`Input "statistic" to show statistic.`))
    console.log(chalk.green(`If you want to exit the game to input "exit"`))
}

function error() { console.log(chalk.red(`You inputed uncorrect value... You need to input 1 or 2... Try again `)) }


function rnd(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function round(numder) {
    let result = rnd(1, 2) === numder
    result ? console.log(chalk.blue('You win!')) : console.log(chalk.red('You lose...'))
    return result
}



function read(link) {
    return new Promise((res, rej) => {
        fs.readFile(link, 'utf8', (err, data) => {
            err ? rej(`File is ${link} not found...`) : data !== '' ? res(JSON.parse(data)) : res([])
        })
    })
}

function write(link, data) {
    return new Promise((res, rej) => {
        fs.writeFile(link, data, 'utf8', (err) => {
            err ? rej(rej(`File is ${link} not found...`)) : res()
        })
    })
}

async function writeToLog(link, result) {

    let log = await read(link)

    let newRecoding = {
        numberOfGames: log.length,
        result: result ? "win" : "lose",
    }

    log.push(newRecoding)

    await write(link, JSON.stringify(log))

}

async function statistic(link) {

    let log = await read(link)
    let totalGames = log.length
    let totalWins = log.filter(game => game.result === "win").length
    let totalLose = totalGames - totalWins
    let ratio = totalWins && totalLose ? (totalWins / totalLose) : "while no wins or loses..."

    console.log("Total - ", totalGames)
    console.log("Total of wins - ", totalWins)
    console.log("Total of loses - ", totalLose)
    console.log("Ratio win/lose - ", ratio)
    console.log("Longest win streak - ", longestStreak(log, 'win'))
    console.log("Longest lose streak - ", longestStreak(log, 'lose'))

}


function longestStreak(array, key) {
    let first = 0, second = 0
    array.forEach(game => {
        if (game.result === key) {
            second++
        } else {
            first = first < second ? second : first
            second = 0
        }
    })
    return first
}

module.exports = {
    statistic,
    round,
    start,
    task,
    error,
    writeToLog
}