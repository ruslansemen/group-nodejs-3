const readline = require('readline')
const colors = require('colors');
const google = require('translate-google')
   
class Translate {

    rl = null
    hello = `Добро пожаловать в переводчик с Английского на Русский. Введите текст для перевода. Exit - выход. \n`.yellow

    constructor(){
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.output
        })
    }
    init(){
        process.stdout.write(this.hello);
        this.rl.on('line', (cmd) => {
            if (cmd === 'exit') {
                this.close()
            } else {
                google(cmd, {from: 'en', to: 'ru'}).then(res => {
                    console.log(res.green)
                }).catch(err => {
                    console.error(err)
                })
            }
        })
    }
    close(){
        process.stdout.write('\nПока пока...\n\n'.yellow)
        this.rl.close()
    }
    
}

const translate = new Translate
translate.init()



