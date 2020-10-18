const random = require('random')
const readlineSync = require('readline-sync')
const chalk = require('chalk')
fs = require('fs');

function fileInit(text){
    console.log("Игра начата ")
    fs.writeFile('log.txt', text, (err) => {
        // console.log("ошибка: " + err)
        if(err) throw err
        // console.log('all is ok')
    })
}

function fileHandler(score){

    fs.appendFile('log.txt', score, (err) => {
        if(err) throw err;
        // console.log('Data has been added!');
    });

}


console.log('\x1Bc')
fileInit("")
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


    fileHandler(` Счет в партии ${countUser} : ${countMashine} \n`)

    boolYes = readlineSync.keyInYNStrict([' Continue the game? '])
    if (!boolYes) {
        console.log('\x1Bc'+' Game over')
        break
    }
}
console.log(` Счет в партии ${countUser} : ${countMashine} `)