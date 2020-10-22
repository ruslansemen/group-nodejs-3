const readline = require("readline");
const fs = require("fs");

const r = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const sideCoin = [
  ["1", "Орел"],
  ["2", "Решка"],
];

function start() {
  console.log("Введите 1 (Орел), 2 (Решка) или q (выход):");
}

start();

r.on("line", (cmd) => {
  let rand = Math.floor(Math.random() * sideCoin.length);

  if (cmd === "q") {
    this.close();
  } else {
    var string;
    if (cmd === "1" || cmd === "2" || cmd === "q") {
      console.log(
        'Вы выбрали "' + cmd + '", Компьютер выбрал "' + sideCoin[rand][0] + '"'
      );
      if (cmd === sideCoin[rand][0]) {
        console.log("Урааа! Вы выиграли!");
        string = "Win\n";
      } else {
        console.log("Упс. Вы проиграли.");
        string = "Loss\n";
      }
    } else {
      console.log("Вы ввели что то не то");
    }
    start();
  }
});
