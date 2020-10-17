const readline = require('readline')
const colors = require('colors');
const fs = require('fs')
const path = require('path')
const clc = require('cli-color')
   
class Game {

    result = {
        name: 'Player',
        count: 0,
        round: 0
    }
    analytics = [
        [clc.bold('Игрок'), clc.bold('Победы'), clc.bold('Раунды')]
    ]
    readFile = []
    rl = null
    start = false
    randomNumber = 0
    hello = `
    Добро пожаловать в игру орел и решка, угудайте что Вам выпало.
    Для начала игры введите - start, для выхода - exit. \n
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
        process.stdout.write(this.hello);
        this.rl.on('line', (cmd) => {
            if (cmd === 'exit') this.close()
            if (cmd === 'start') {
                this.createRandomNumber()
                process.stdout.write('Компьютер подкинул монетку, введите ответ..0 или 1\n');
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
        process.stdout.write('\nПока пока, результат игры записан и выведен на экран\n\n'.green);
        this.writeResult()
        this.rl.close()
        this.getAnalytic()
    }
    createRandomNumber(){
        this.start = true
        return this.randomNumber = Math.floor(Math.random() * 2)
    }
    endRound(isFinall){
        this.start = false
        if (isFinall) {
            process.stdout.write('Поздравляю, вы угадали. Введите start, чтобы начать новый раунд или exit для выхода из игры\n'.green)
            this.result.count++
            this.result.round++
            
        } else {
            process.stdout.write('К сожалению вы не угадали. Введите start, чтобы начать новый раунд или exit для выхода из игры\n'.red)
            this.result.round++
        }
    }
    writeResult(){
        this.readFile.push(this.result)
        fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(this.readFile), (err) => {
            throw err
        })
    }
    getAnalytic(){
        this.readFile.forEach( (elem) => {
            this.analytics.push([
                elem.name,
                elem.count,
                elem.round
            ])
        })
        process.stdout.write(clc.columns(this.analytics));
    }
}

const game = new Game
game.init()





let t = [{
    name: 'player',
    count: 0,
    round: 1
},
{
    name: 'player2',
    count: 0,
    round: 1
}
]

let = [
    ['Игрок', 'Победы', 'Раунды'],
    ['player', 0, 1],
    ['player2', 0, 1]
]

let re = [
    ['Игрок', 'Победы', 'Раунды'],
]

t.forEach( (elem) => {
    re.push([elem.name, elem.count, elem.round])
})