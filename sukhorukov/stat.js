const minimist = require('minimist')
const fs = require('fs')
const path = require('path')

const argv = minimist(process.argv.slice(2), {
    default: {
        log: 'game.log'
    },
    alias: {
        l: 'log',
    },
    string: ['log']
})

const statData = JSON.parse(fs.readFileSync(path.join(__dirname, argv.log), 'utf8'))
const wins  = statData.filter((item) => item.win === true)
const falls  = statData.filter((item) => item.win !== true)
const winRatio =  Math.floor(wins.length / statData.length * 100)
const fallsRatio =  Math.floor(falls.length / statData.length * 100)

console.log("\033[2J\033[0f")
console.log('Общее количество партий: ', statData.length)
console.log(`Выиграно / проиграно партий: ${wins.length} / ${falls.length}`)
console.log(`Процентное соотношение выиграных / проиграных партий: ${winRatio}% / ${fallsRatio}% (от ${statData.length} сыгранных)\n`)
