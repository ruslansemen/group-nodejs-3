const moment = require('moment')
const chalk  = require('chalk')

function checkDate(days) {
    if(days % 10 == 1 && days != 11) { 
        text = 'день'
    } else if(days % 10 == 2 && days != 12) {
        text = 'дня'
    } else if(days % 10 == 3 && days != 13) {
        text = 'дня'
    } else if(days % 10 == 4 && days != 14) {
        text = 'дня'
    } else { text = 'дней' }
    return 'Через '+days+' '+text+' будет '+moment().add(days, 'days').format("DD.MM.YYYY")
}

let readline = require('readline')

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Введите количество дней: '
})

rl.prompt();
rl.on('line', (input) => {
  console.log(chalk.blue.bgWhite(checkDate(input)))
  rl.close()
});