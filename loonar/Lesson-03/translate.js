//const translate = require('google-translate-api')
const translate = require('@vitalets/google-translate-api')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})
console.log('Русско-английский словарь')
console.log('Введите слово, (выход - exit')
rl.on('line', (cmd) => {
    if (cmd === 'exit') {
        rl.close()
    }
    translate(cmd, { to: "en" }).then(res => {
        console.log(`Перевод ${res.text}`)
        console.log(`from ${res.from.language.iso}`)
    }).catch(err => {
        console.error(err)
    })
})