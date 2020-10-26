const clc = require("cli-color"); // colors
const readline = require('readline');
const fs = require('fs');
const path = require('path');

/**
 * Игра орел и решка
 */
class Game {
  constructor() {
    //comands
    this.comands = ['1', '2', '0', 'exit'];

    //Colored text
    this.error = clc.red.bold;
    this.warn = clc.yellow;
    this.notice = clc.blue;

    //readline interface
    this.rl = readline.createInterface({
      input: process.stdin, // ввод из стандартного потока
      output: process.stdout // вывод в стандартный поток
    });

    //game result
    this.gameResult = null;

    //game data
    this.gameData = {
      games: [],
    };

    //filename
    this.filename = 'game-log.json';
  }

  /**
   *
   * @param min
   * @param max
   * @returns {number}
   */
  getRandomIntInclusive(min = 1, max = 2) {
    min = Math.floor(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }

  textGreeting() {
    console.log(this.notice('Добро пожаловать в игру орел и решка.'));
  }

  textError() {
    console.log(this.error('Введена неправильная команда!'));
  }

  textGoodbye() {
    console.log(this.warn('Спасибо за игру, до скорых встреч!'));
  }

  textRules() {
    console.log(this.notice('Чтобы подкинуть монетку введите цифу 1 - решка или 2 - орел.'));
    console.log(this.notice('Для выхода из игры введите 0 или exit.'));
  }

  /**
   * Read file
   */
  readFile() {
    fs.readFile(
      path.join(__dirname, this.filename),
      'utf8',
      (err, data) => {
        this.handleData(err, data)
      }
    );
  }

  /**
   * Write data to file
   * @param data
   */
  writeFile(data) {
    //console.log(data);
    fs.writeFile(
      path.join(__dirname, this.filename),
      JSON.stringify(data),
      (err) => {
        if (err) throw err;
        //console.log('logged...');
      }
    );
  }

  /**
   * If no data from file put data from game template
   * Else parse data -> push new result -> save to file
   * @param err
   * @param data
   */
  handleData(err, data) {
    if (err && err.code === 'ENOENT') {
      this.gameData.games.push(this.gameResult);
      this.writeFile(this.gameData);
    } else {
      let obj = JSON.parse(data);
      obj.games.push(this.gameResult);
      this.writeFile(obj);
    }
  }

  /**
   * Log game result
   */
  log() {
    this.readFile();
  }

  /**
   * Launch the game
   */
  init() {
    this.textGreeting();
    this.textRules();

    this.rl.on('line', (cmd) => {
      let result = this.getRandomIntInclusive();

      let err = this.comands.find((currentValue) => {
        return currentValue === cmd
      });

      if (typeof err === 'undefined') {
        this.textError();
        this.textRules();
        return;
      }

      if (cmd === '0' || cmd === 'exit') {
        this.textGoodbye();
        return this.rl.close();
      }

      if (result === +cmd) {
        this.gameResult = 1;
        console.log('Поздравляем вы угадали!');
      } else {
        this.gameResult = 0;
        console.log('К сожалению вы не угадали, попробуйте еще!');
      }

      this.log();
    });
  }
}

(new Game()).init();

//Пауза (блокирование ввода):
// rl.pause();
// //Разблокирование ввода:
// rl.resume();
// //Окончание работы с интерфейсом readline:
// rl.close();

// //Обработка каждой введенной строки:
// rl.on('line', function (cmd) {
//   console.log('You just typed: ' + cmd);
// });

// fs.readFile(filename, [options], callback) - чтение файла целиком
// fs.writeFile(filename, data, [options], callback) - запись файла целиком
// fs.appendFile(filename, data, [options], callback) - добавление в файл
// fs.rename(oldPath, newPath, callback) - переименование файла.
// fs.unlink(path, callback) - удаление файла.