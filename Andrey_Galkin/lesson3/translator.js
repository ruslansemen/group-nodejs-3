const translator = require('translate-google');
const readline = require('readline');
const clc = require("cli-color"); // colors


class Translator {
  constructor() {
    //readline interface
    this.rl = readline.createInterface({
      input: process.stdin, // ввод из стандартного потока
      output: process.stdout // вывод в стандартный поток
    });

    //Colored text
    this.error = clc.red.bold;
    this.warn = clc.yellow;
    this.notice = clc.blue;
  }

  textRules() {
    console.log(this.notice('Введите текст для перевода с Английского на Русский'));
    console.log(this.notice('Для выхода введите 0 или exit.'));
  }

  textGoodbye() {
    console.log(this.warn('До скорых встреч!'));
  }

  translate(text) {
    translator(text, {from: 'en', to: 'ru',})
      .then(res => {
        console.log(this.notice('Перевод: '), res);
      })
      .catch(err => {
        console.error(err);
      })
  }

  init() {
    this.textRules();
    this.rl.on('line', (cmd) => {

      if (cmd === '0' || cmd === 'exit') {
        this.textGoodbye();
        return this.rl.close();
      }

      this.translate(cmd);
    });
  }
}

(new Translator()).init();

