const translate = require('@vitalets/google-translate-api');
const readline = require('readline')
const chalk =require('chalk')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

console.log(chalk.bgMagenta.black('Введите фразу на любом языке для перевода на английский:'))
rl.on('line',(text) => {
    translate(`${text}`, {to: 'en'}).then(res => {
        console.log(chalk.green(`Перевод слова на английский:${res.text}`))
        console.log(chalk.blue(`Язык оригинала: ${res.from.language.iso}`))
    }).catch(err => {
        console.log(chalk.red(err))
    })
    rl.close()
})
