
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')


let winParts = 0
let lostParts = 0
let maxWins = 0
let maxLosts = 0
let iMaxWins = 0
let iMaxLosts = 0

function readLogs (logFile) {
    const data = fs.readFileSync(path.join(__dirname, logFile), 'utf8').split(';')
    const parts = data.length
    for (let i = 0; i < parts; i++){
        if (JSON.parse(data[i]).resultOfParty == "Lost") {
            lostParts += 1
        } else {
            winParts += 1
        }
    }
    for (let i = 0; i < parts; i++) {
        if (JSON.parse(data[i]).resultOfParty == "Lost") {
            iMaxLosts += 1       
        }
        else {
            if (maxLosts < iMaxLosts) {
                maxLosts = iMaxLosts
            }        
            iMaxLosts = 0
            continue
        }
    }
    for (let i = 0; i < parts; i++) {
        if (JSON.parse(data[i]).resultOfParty == "Win") {
            iMaxWins += 1       
        }
        else {
            if (maxWins < iMaxWins) {
                maxWins = iMaxWins
            }        
            iMaxWins = 0
            continue
        }
    }
    console.log(chalk.blue.bgWhite(`Всего сыграно ${chalk.bgBlack(parts)} партий.`))
    console.log(chalk.bgWhite(chalk.green(`Выиграно партий ${chalk.bgBlack(winParts)},`),chalk.red(`проиграно - ${chalk.bgBlack(lostParts)}.`)))
    console.log(chalk.bgWhite.gray(`Соотношение выиграных партий к проигранным равно ${chalk.bgBlack(winParts/lostParts)}.`))
    console.log(chalk.bgWhite.gray(`Максимальное количество проигранных подряд партий - ${chalk.bgBlack(maxLosts)}.`))
    console.log(chalk.bgWhite.gray(`Максимальное количество выигранных подряд партий - ${chalk.bgBlack(maxWins)}.`))
}

readLogs('./lesson2_1.json')
