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
                console.log('You win! :D')
            } else {
                console.log('You lose :(')
            }
            fs.appendFile(`${fileName}`, JSON.stringify(`${guess}: ${win},`), (error) => {
                if(error) throw new Error;
            })

        } else {
            console.log('Wrong input. You need to enter 1 or 2')
        }
    })
}

play('gameLog.json');








/*
2) Сделать программу-анализатор игровых логов. В качестве
аргумента программа получает путь к файлу. Выведите игровую
статистику: общее количество партий, количество выигранных /
проигранных партий и их соотношение, максимальное число побед /
проигрышей подряд.
 */