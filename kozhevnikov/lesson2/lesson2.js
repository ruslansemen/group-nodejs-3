const random = require('random')
const readlineSync = require('readline-sync')
const chalk = require('chalk')


console.log('\x1Bc')
let countUser = 0
let countMashine =0
while (true) {
    inputUser  = readlineSync . keyIn ( ' Hit 0 or 1 key:  ' , { limit : ' $ <0-1> ' } )
    console.log(' Вы ввели ', inputUser)
    inputMashine = random.int(min = 0, max = 1)
    console.log(' Компьютер выбрал', inputMashine)
    if (inputUser == inputMashine) {
        countUser++
        console.log(' Ура! Вы выиграли')
    } else {
        countMashine++
        console.log(' Выиграл компьютер')
    }

    boolYes = readlineSync.keyInYNStrict([' Continue the game? '])
    if (!boolYes) {
        console.log('\x1Bc'+' Game over')
        break
    }
}
console.log(' Счет в партии ' + countUser + ' : ' + countMashine)