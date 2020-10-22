const readline = require('readline')
const translate = require('@vitalets/google-translate-api');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.output,
})
let strinfFromCmd
let langFrom
let langTo
let phrase

console.log ('Введите язык, с которого переводим, через пробел - язык, на который, через пробел в кавычках - фразу')
console.log ('Например: ru en "я люблю пиццу"')
console.log ('Вводите языки согласно Стандарту ISO 639. Чтобы выйти из переводчика, нажмите "e"')
rl.on('line', (cmd) => {
    strinfFromCmd = `${cmd}`
    if (strinfFromCmd === 'e') {
        rl.close() 
    }
    else {
        langFrom = strinfFromCmd.split(' ')[0]
        langTo = strinfFromCmd.split(' ')[1]
        phrase = strinfFromCmd.split(' "')[1].split('"')[0]
        translate(phrase, {from: langFrom, to: langTo}).then(res => {
            console.log (res.text)
            
        }).catch(err => {
            console.error(err);
        });
    }
    
})

