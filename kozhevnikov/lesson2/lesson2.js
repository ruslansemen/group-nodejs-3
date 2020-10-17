const random = require('random')
const readlineSync = require('readline-sync');
const chalk = require('chalk')


console.log('\x1Bc');
while (true) {
    input  = readlineSync . keyIn ( ' Hit 0 or 1 key:  ' , { limit : ' $ <0-1> ' } ) ;
    console.log(' Вы ввели ', input);
    console.log(' Машина выбрала', random.int(min = 0, max = 1));
    boolYes = readlineSync.keyInYNStrict([' Continue the game? '])
    if (!boolYes) {
        break;
    }
}
console.log(' Вы ввели ', boolYes);