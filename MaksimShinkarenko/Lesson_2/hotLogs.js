const fs = require('fs')
const minimistLib = require('minimist')
const path = require('path')

const hotLog = (file) => {
  if (file) {
    fs.readFile(path.join(__dirname, 'logs', file + '.txt'), 'utf8', (err, data) => {
      if (err) {
        console.log('Не удалось прочитать файл, проверь имя файла')
        throw err
      }
      let score = JSON.parse(data)
      console.log(`Партий сыграно: ${score.wins + score.looses} \n Побед: ${score.wins}, проигрышей: ${score.looses}`)
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

