const fs = require('fs')
const minimistLib = require('minimist')
const path = require('path')

const hotLog = (file) => {
  if (file) {
    fs.readFile(path.join(__dirname, 'logsGame', file + '.txt'), 'utf8', (err, data) => {
      if (err) {
        console.log('Не удалось прочитать файл, проверь имя файла')
        throw err
      }
      let score = JSON.parse(data)
      console.log(`Партий сыграно: ${score.wins + score.looses} \nПобед: ${score.wins}, проигрышей: ${score.looses}. \nМаксимальная серия побед: ${score.winsCombo}\nМаксимальная серия поражений: ${score.lossesCombo} \nВсего очков: ${score.wins - score.looses}. Процент побед: ${Math.round((score.wins / (score.looses + score.wins )) * 100)}`)
    })

  } else {
    console.log(helpText)
    process.exit(-1)
  }
}

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

const helpText = 'Синтаксис: node hotLogs.js [--file filename] [--help] \n --file (-f) filename - путь к файлу filename.txt \n --help (-h) - для' +
  ' вывода справки'

if (argv.help) {
  console.log(helpText)
  process.exit(-1)
} else {
  hotLog(argv.file)
}

