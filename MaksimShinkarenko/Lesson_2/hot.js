const fs = require('fs')
const readline = require('readline')
const minimistLib = require('minimist')
const path = require('path')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const argv = minimistLib(process.argv.slice(2), {
  default: {
    file: '',
    help: false,
  },
  alias: {
    f: 'file',
    h: 'help',
  },
  boolean: ['help'],
  string: ['file'],
})

const allowTypes = ["1", "2"]

let maxWins = 0
let maxLosses = 0

let score = {
  wins: 0,
  looses: 0,
  winsCombo: 0,
  lossesCombo: 0,
}

const hot = (num) => {
  if (allowTypes.indexOf(num) === -1) {
    console.error('Допускается вводить только числа 1 или 2')
  } else {
    let qNum = getRandomInt()
    if (argv.file) {
      fs.writeFileSync(path.join(__dirname, 'logsGame', argv.file  + '.txt'), '')
    }
    if (qNum === parseInt(num)) {
      score.wins += 1

      maxLosses = 0
      maxWins += 1

      if (maxWins > score.winsCombo) {
        score.winsCombo = maxWins
      }

      console.log(`Угадал! \n Побед: ${score.wins}, проигрышей: ${score.looses} \n Серия побед: ${maxWins}  \n Попробуй ещё`)

      if (argv.file)
        fs.writeFileSync(path.join(__dirname, 'logsGame', argv.file + '.txt'), JSON.stringify(score))
      return true
    } else {
      score.looses += 1

      maxLosses += 1
      maxWins = 0

      if (maxLosses > score.lossesCombo) {
        score.lossesCombo = maxLosses
      }

      console.log(`Не угадал! \n Побед: ${score.wins}, проигрышей: ${score.looses} \n Серия проигрышей: ${maxLosses} \n Попробуй ещё`)

      if (argv.file)
        fs.writeFileSync(path.join(__dirname, 'logsGame', argv.file  + '.txt'), JSON.stringify(score))
      return false
    }
  }
}

const getRandomInt = () => {
  return Math.floor(Math.random() * 2 + 1);
}


if (argv.help) {
  console.log('Синтаксис: node hot.js [--file filename] [--help] \n --file (-f) filename - для записи логов в файл filename.txt \n --help (-h) -' +
    ' для вывода справки \nПравила игры: необходимо вводить числа 1 или 2, если угадал - получаешь бал, проиграл - теряешь бал. \т Для выхода введи' +
    ' e или exit')
  process.exit(-1)
} else {
  rl.on('line', (cmd) => {
    if (cmd === 'exit' || cmd === 'e') {
      rl.close()
      process.exit(-1)
    }
    hot(cmd)
  })
}