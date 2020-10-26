const translate = require('@vitalets/google-translate-api');
const readlineSync = require('readline-sync');

const translator = async () => {
    while (true) {
        input = readlineSync.question(' Enter the text in English : ');
        // console.log(' Вы ввели ', input);

        await translate(input, {to: 'ru'})
            .then(res => {
                console.log(res.text);
            })
            .catch(err => {
                console.error(err);
            });
        boolYes = readlineSync.keyInYNStrict([' Continue? ']);
        if (!boolYes) {
            console.log('\x1Bc' + ' До свидания!');
            break;
        }
    }
}
translator();