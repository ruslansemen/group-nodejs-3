const readline = require('readline')
const fs = require('fs')
const chalk = require('chalk');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function play(fileName) {
    rl.on('line', (guess) => {
        if (guess === 'e' || guess === 'exit') rl.close()
        guess = parseInt(guess);

        if (guess === 1 || guess === 2) {
            const result = Math.floor(Math.random()* 2 + 1)
            let win = false
            if (guess === result) {
                win = true
                console.log(chalk.bgGreen.black('You win! :D'))
            } else {
                console.log(chalk.bgMagenta.black('You lose :('))
            }
            fs.appendFile(`${fileName}`, JSON.stringify(`${guess}: ${win},`), (error) => {
                if(error) throw new Error;
            })

        } else {
            console.log(chalk.bgRed.black('Wrong input. You need to enter 1 or 2'))
        }
    })
}

play('gameLog.json');
