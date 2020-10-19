const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function randomCoin() {
    return (Math.floor(Math.random() * 2) === 0) ? "1" : "2";
}

console.log('Введите 1 - если Орел, 2 - если Решка, exit - выход');
rl.on('line', function (cmd) {
    let log;
    let secret = randomCoin();

    if (cmd === 'exit') {
        return rl.close();
    }

    if (cmd === '1' || cmd === '2') {
        if (cmd === secret) {
            console.log(`Угадали\n`);
            log = "Win\n";
        } else {
            console.log(`Не угадали\n`);
            log = "Loss\n";
        }
        fs.appendFileSync(path.join(__dirname, 'log'), log, 'utf8');
        
        console.log('Введите 1 - если Орел, 2 - если Решка, exit - выход');
    } else {
        console.log('Вы ввели не 1, не 2 и не exit\n');
        console.log('Введите 1 - если Орел, 2 - если Решка, exit - выход');
    }
})
