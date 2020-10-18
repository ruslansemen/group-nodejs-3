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

let score = {
  wins: 0,
  looses: 0,
}

const hot = (num) => {
  if (allowTypes.indexOf(num) === -1) {
    console.error('Допускается вводить только числа 1 или 2')
  } else {
    let qNum = getRandomInt()
    if (argv.file) {
      fs.writeFileSync(path.join(__dirname, 'logs', argv.file  + '.txt'), '')
    }
    if (qNum === parseInt(num)) {
      score.wins += 1
      console.log(`Угадал! \n Побед: ${score.wins}, проигрышей: ${score.looses} \n Попробуй ещё`)
      if (argv.file)
        fs.writeFileSync(path.join(__dirname, 'logs', argv.file + '.txt'), JSON.stringify(score))
      return true
    } else {
      score.looses += 1
      console.log(`Не угадал! \n Побед: ${score.wins}, проигрышей: ${score.looses} \n Попробуй ещё`)
      if (argv.file)
        fs.writeFileSync(path.join(__dirname, 'logs', argv.file  + '.txt'), JSON.stringify(score))
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