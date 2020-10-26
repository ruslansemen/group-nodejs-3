const readline = require('readline')
const fs = require('fs')
const path = require('path')
const minimistLib = require('minimist')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const filename = minimistLib(process.argv.slice(2))._[0] + ".json"

fs.readFile(path.join(__dirname, filename), 'utf8', (err, data) => {
    if(err){
        throw err
    }

    let win=0, lose=0, prevStep, winLine=0, loseLine=0, accumWin = 0, accumLose = 0
    JSON.parse(data).log.forEach(item => {
        item[2] ? win++ : lose++
        if (prevStep == item[2]) {
            item[2] == true ? accumWin++ : accumLose++
        } 
            if (winLine < accumWin+1 && accumWin != 0) winLine = accumWin + 1
            if (loseLine < accumLose+1 && accumLose != 0) loseLine = accumLose + 1
        
        prevStep = item[2]
    });
    console.log(`
        Выиграно: ${win} (${(win/(win+lose)*100).toFixed(2)}%)\n
        Проиграно: ${lose} (${(lose/(win+lose)*100).toFixed(2)}%)\n
        Максимальная выигрышная серия: ${winLine}\n
        Максимальная проигрышная серия: ${loseLine}
        `)
})

rl.close()