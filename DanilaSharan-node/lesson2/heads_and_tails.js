const readline = require('readline')
const fs = require('fs')
const path = require('path')

class Game {

  result = {
    winCount: 0,
    gameCount: 0
  }
  analytics = []
  readFile = []
  rl = null
  start = false
  rndNum = 0
  greetings = `     Орел и решка
Для начала игры введите - "start", для выхода - "exit" или "q", для вывода статистики - "stats"`

  constructor(){
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.output
    })
    fs.readFile(path.join(__dirname, 'store.json'), 'utf8', (err, data) => {
      if (err) {
        throw err
      }
      if (data){
        this.readFile = JSON.parse(data)
      }

    })
  }
  init(){
    console.log(this.greetings);
    this.rl.on('line', (cmd) => {
      if (cmd === 'exit' || cmd === 'q' || cmd === 'й' || cmd === 'учше') this.endGame()
      if (cmd === 'start' || cmd === 'ыефке') {
        this.createRndNum()
        console.log('Введите: 1 - Орел, 2 - Решка');
      }
      if (cmd === 'stats' || cmd === 'ефеы') this.getAnalytic()
      if (this.start && +cmd >= 0) {
        if (+cmd === this.rndNum && (+cmd === 2 || +cmd === 1)) {
          console.log('На монетке - ', this.rndNum)
          console.log('Вы выиграли!!')
          this.result.winCount++
          this.result.gameCount++
          this.createRndNum()
          if(cmd === 'exit') this.start = false
        } else if (+cmd !== this.rndNum && (+cmd === 2 || +cmd === 1)) {
          console.log('На монетке - ', this.rndNum)
          console.log('Вы проиграли! Попробуйте еще, на этот раз вам точно повезет!')
          this.result.gameCount++
          this.createRndNum()
          if(cmd === 'exit') this.start = false
        } else {
          console.log('Неправильный ввод')
        }
      }
    })
  }
  endGame(){
    console.log('Спасибо за игру!!');
    if (this.result.gameCount > 0) this.writeResult()
    this.rl.close()
  }
  createRndNum(){
    this.start = true
    return this.rndNum = Math.floor(Math.random() * 2 + 1)
  }
  writeResult(){
    this.readFile.push(this.result)
    fs.writeFileSync(path.join(__dirname, 'store.json'), JSON.stringify(this.readFile), (err) => {
      throw err
    })
  }
  getAnalytic(){
    this.readFile.forEach( (elem) => {
      if(elem.winCount > 0){
        elem.winrate = Math.floor((elem.winCount/elem.gameCount)*100)
      } else console.log(this.analytics);
      this.analytics.push([
        elem.winCount,
        elem.gameCount,
        elem.winrate
      ])
    })
    this.analytics.map((e) => (console.log('Игр :',e[1], 'Побед :', e[0] , 'Результативность :', e[2])))
  }
}

const game = new Game
game.init()
