let ProgressBar = require("progress");

let white = "\u001b[47m \u001b[0m";
let black = "\u001b[40m \u001b[0m";
let settings = {
    complete: white,
    incomplete: black,
    width: 40,
    total: 50,
};

console.log("Скачивание данных...");

let bar = new ProgressBar(
    " прогресс: [:bar] :rate/bps :percent :etas",
    settings
);

let timer = setInterval(() => {
    bar.tick();
    if (bar.complete) {
        console.log("Скачивание данных завершено!");
        clearInterval(timer);
    }
}, 100);
