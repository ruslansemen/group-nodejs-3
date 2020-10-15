module.exports = class Lesson_1 {
    static chalk = require('chalk');

    static print(msg) {
        const sign = this.chalk.green.underline.bold('Tokarev:') + __dirname + '$';

        console.log(`${sign}\n${msg}`);
    }

    static run() {
        this.print('You run lesson_1 application');
    }
}
