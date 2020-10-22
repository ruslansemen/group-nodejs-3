const chalk = require('chalk');
const log = console.log;

function colorize(text, count) {
    if (count === 0) {
        return
    }
    let colors = [chalk.cyan, chalk.red, chalk.black, chalk.green, chalk.yellow, chalk.blue, chalk.magenta];

    let number = Math.floor(Math.random() * colors.length);

    let randomColor = colors[number];
    log(randomColor(`${text}`));
    setTimeout(() => {
        colorize(text, count - 1)
    }, 1000);
}

colorize('Enjoy the colors', 5);

