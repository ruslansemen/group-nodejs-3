const readline = require('readline')
const colors = require('colors');
const fs = require('fs')
const path = require('path')
   
class Game {

    result = {
        name: 'Player',
        count: 0,
        round: 0
    }
    readFile = []
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
        fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
            if (err) {
                throw err
            }
            if (data){
                this.readFile = JSON.parse(data)
            }
            
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
            if (this.start && +cmd >= 0) {
                if (+cmd === this.randomNumber) {
                    this.endRound(1)
                } else {
                    this.endRound(0)
                }
            }
        })
    }
    close(){
        console.log('Пока пока, результат игры записан'.green);
        this.writeResult()
        this.rl.close()
    }
    createRandomNumber(){
        this.start = true
        return this.randomNumber = Math.floor(Math.random() * 2)
    }
    endRound(isFinall){
        this.start = false
        if (isFinall) {
            console.log('Поздравляю, вы угадали. Введите start, чтобы начать новый раунд или exit для выхода из игры'.green)
            this.result.count++
            this.result.round++
            
        } else {
            console.log('К сожалению вы не угадали. Введите start, чтобы начать новый раунд или exit для выхода из игры'.red)
            this.result.round++
        }
    }
    writeResult(){
        this.readFile.push(this.result)
        fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(this.readFile), (err) => {
            throw err
        })
    }
}

const game = new Game
game.init()