const readline = require('readline')
const colors = require('colors');
   
class Game {

    rl = null
    start = false
    randomNumber = 0
    hello = `
    Добро пожаловать в игру орел и решка, угудайте что Вам выпало.
    Для начала игры введите - start, для выхода - exit.
    `

    constructor(){
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.output
        })
    }
    init(){
        console.log(this.hello);
        this.rl.on('line', (cmd) => {
            if (cmd === 'exit') this.close()
            if (cmd === 'start') {
                this.createRandomNumber()
                console.log('Компьютер подкинул монетку, введите ответ..0 или 1');
            }
            if (this.start && +cmd > 0) {
                if (+cmd === this.randomNumber) {
                    console.log('Поздравляю, вы угадали. Введите start, чтобы начать новый раунд или exit для выхода из игры'.green)
                    this.start = false
                } else {
                    console.log('К сожалению вы не угадали. Введите start, чтобы начать новый раунд или exit для выхода из игры'.red)
                    this.start = false
                }
            }
        })
    }
    close(){
        console.log('Bye, bye'.green);
        this.rl.close()
    }
    createRandomNumber(){
        this.start = true
        return this.randomNumber = Math.floor(Math.random() * 2)
    }
}

const game = new Game
game.init()