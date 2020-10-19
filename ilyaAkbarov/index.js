const readline = require('readline')
const path = require('path')
const {readStatistic, writeStatistic} = require('./statistic')

const commands = ['1', '2']
const exitCommands = ['e', 'exit']
const results = {
  1: 'Орел',
  2: 'Решка'
}
const messages = {
  start: 'Орел или решка. Орел = 1, решка = 2',
  wrongInput: 'Введите число. Орел = 1, решка = 2. Чтобы выйти введите "exit" или "e"',
  wrongAnswer: result => `Не угадал. Правильный ответ ${result}`,
  rightAnswer: 'Угадал',
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log(messages.start)

rl.on('line', cmd => {
  const statistic = readStatistic(path.resolve(__dirname, 'statistic.json'))
  if (exitCommands.includes(cmd)){
    rl.close()
  }
  
  if (cmd === 'stats') {
    console.log(statistic)
    return
  }
  
  if (!commands.includes(cmd)) {
    console.log(messages.wrongInput)
    return
  }
  
  const resultKey = Math.ceil(Math.random() * 2)
  const isWin = resultKey === +cmd
  if (isWin) {
    console.log(messages.rightAnswer)
  } else {
    console.log(messages.wrongAnswer(results[resultKey]))
  }
  writeStatistic(statistic, path.resolve(__dirname, 'statistic.json'), isWin)
})
