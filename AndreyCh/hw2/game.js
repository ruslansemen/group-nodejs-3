const randomInt = require('random-int')
const readline = require('readline')
const util = require('util')
const jsonfile = require('jsonfile')
const fs = require('fs')

const logFile = 'log.json'

const game = (guess, logFile, callback) => {
  Statistics.create()

  if (![1, 2].includes(guess)) {
    callback(new Error('Possible variants only 1 or 2'))
    return
  }

  const result = randomInt(1, 2)
  if (result === guess) {
    callback(null, 'Won!!!')
    Statistics.add(1)
  } else {
    callback(null, 'Lost :(')
    Statistics.add(0)
  }
};

class Statistics {
  static create() {
    if (fs.existsSync(logFile)) return

    jsonfile.writeFile(logFile, [], function (err) {
      if (err) console.error(err)
    })
  }

  static show() {
    jsonfile.readFile(logFile)
      .then(obj => {
        const played = obj.length
        const won = obj.filter(o => o.result).length
        const lost = obj.filter(o => !o.result).length
        const wonPercent = Math.round(won / played * 100)
        const lostPercent = Math.round(lost / played * 100)
        let maxWon = 0
        let maxLost = 0

        let maxWonTemp = 0
        let maxLostTemp = 0
        obj.forEach(o => {
          if (o.result) {
            maxWonTemp ++;

            if (maxLost < maxLostTemp) {
              maxLost = maxLostTemp;
            }
            maxLostTemp = 0;
          } else {
            if (maxWon < maxWonTemp) {
              maxWon = maxWonTemp;
            }
            maxWonTemp = 0;

            maxLostTemp ++;
          }
        })
        if (maxLost < maxLostTemp) maxLost = maxLostTemp;
        if (maxWon < maxWonTemp) maxWon = maxWonTemp;

        console.log('Games played: ', played)
        console.log('Games won: ', won, ` (${wonPercent}%)`)
        console.log('Games lost: ', lost, ` (${lostPercent}%)`)
        console.log('Best set: ', maxWon)
        console.log('Worst set: ', maxLost)
      })
      .catch(error => console.error(error))
  }

  static add(result) {
    jsonfile.readFile(logFile)
      .then(obj => {
        obj.push({result: result})
        jsonfile.writeFile(logFile, obj, { spaces: 2 }, function (err) {
          if (err) console.error(err)
        })
      })
      .catch(error => console.error(error))
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
const promisifyGame = util.promisify(game)

rl.setPrompt('The result should be: ');
rl.prompt();
rl.on('line', (line) => {
  switch(line.trim()) {
    case 'q':
      rl.close();
      return;
    case 's':
      Statistics.show()
      break
    default:
      promisifyGame(parseInt(line), logFile)
        .then((result) => {
          console.log(result)
        })
        .catch((e) => {
          console.log(e.toString())
        })
      break
  }
    setTimeout(() => {rl.prompt();}, 50)
})
