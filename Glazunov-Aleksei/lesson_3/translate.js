const readline = require('readline')
const translate = require('@vitalets/google-translate-api')


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

console.log('Введите сообщение на английском, переведем его на русский')
rl.on('line', (cmd) => {
    
    translate(cmd, {to: 'ru'}).then(res => {
        console.log(res.text);
    }).catch(err => {
        console.error(err);
    });
})

