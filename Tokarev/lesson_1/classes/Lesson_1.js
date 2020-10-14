module.exports = class Lesson_1 {
    static chalk = require('chalk');

    static print(msg) {
        const sign = this.chalk.green.underline.bold('$Tokarev:');

        console.log(`${sign} ${msg}`);
    }

    static run() {
        console.log(this.print('privet'));
    }
}