const clc = require("cli-color"); // colors
const fs = require('fs'); //file system lib
const path = require('path'); // path resolver lib
const minimist = require('minimist');

class Analizer {
  constructor() {
    this.args = minimist(process.argv.slice(2));
  }

  /**
   * Read file
   */
  readFile() {
    fs.readFile(
      path.join(__dirname, this.args.f),
      'utf8',
      (err, data) => {
        this.handleData(err, data)
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
      return console.log('Файл не найден, проверьте правильность имени файла!');
    } else {
      let obj = JSON.parse(data);

      const result = {
        total: 0,
        won: 0,
        lost: 0,
        win_streak: 0,
        loss_streak: 0,
      };

      result.total = obj.games.length;

      for (let i = 0; i < obj.games.length; i++)
      {
        if(obj.games[i] === 1){
          result.won++;
        } else {
          result.lost++;
        }
      }

      result.win_streak = this.getStreak(obj.games, 1);
      result.loss_streak = this.getStreak(obj.games, 0);

      result.ratio =  Math.ceil(100 / result.total * result.won) + '% / ' + Math.floor(100 / result.total * result.lost) + '%';

      this.showResult(result);
    }
  }

  getStreak(data, value) {
    let sc = 0,  msc = -1;

    for (let i = 0; i < data.length; i++)
    {
      if(data[i] === value){
        sc++;
      } else {
        if(sc > msc) {
          msc = sc;
        }
        sc = 0;
      }
    }

    return msc;
  }

  showResult(result){
    //Text in colums format
    process.stdout.write(
      clc.columns([
        [clc.bold("Total games"), clc.bold("Won"), clc.bold("Lost"), clc.bold("Ratio"), clc.bold("Win streak"), clc.bold("Loss streak")],
        [result.total, result.won, result.lost, result.ratio, result.win_streak, result.loss_streak],
      ])
    );
  }

  init() {
    this.readFile();
  }
}

(new Analizer()).init();