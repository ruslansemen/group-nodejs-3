//можно ввести название файла для логов в виде аргумента, получится запись вида $ node orel.js fdfdf
// где fdfdf - будет название файла логов

const readline = require('readline')
const fs = require('fs')
const path = require('path')
const minimistLib = require('minimist')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

// берем аргумент в качестве названия для файла логов
const filename = minimistLib(process.argv.slice(2))._[0] + ".json"

console.log("Отгадайте число 1 или 2, для выхода нажмите 'e'")

let counter = 1, log = [] //для шагов игры
rl.on('line', (cmd) => {
    //можно выйти написав exit или e
    if(cmd === 'exit' || cmd === 'e'){
        rl.close()
        //добавляем запись в лог-файл
        fs.writeFile(path.join(__dirname, filename), JSON.stringify({log}), (err, data) => {
            if(err){
                throw err
            }
            //console.log(data)
        })
    } else {

        let result
        // проверяем на совпадение и правильность ввода
        if (cmd==1 || cmd==2) {
            result = cmd == Math.round(Math.random())+1
            // создаем запись для лога
            log.push([counter, cmd, result])//{counter: counter, userChoice: cmd, result: result}
            console.log( result ? "Угадали" : "Неверно. Попробуйте снова")
            counter++
        } else {
            result = "Неверный ввод"
            console.log('Вы ввели неверное число. Необходимо ввести "1" или "2" для угадывания, "e" для выхода')
        }
    }
})