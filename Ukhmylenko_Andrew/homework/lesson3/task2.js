const translate = require("google-translate-open-api").default;
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = (name) => () =>
    new Promise((resolve) => {
        rl.question(name, resolve);
    });

const answers = {};

const setAnswer = (name) => (answer) => {
    answers[name] = answer;
};

const askText = question(
    "Какую фразу вы хотите перевести? (Напишите фразу на любом языке)\n"
);
const askLanguage = question(
    "На какой язык вы хотите перевести фразу? (Список языков находится в файле languages.txt)\n"
);

askText()
    .then(setAnswer("text"))
    .then(askLanguage)
    .then(setAnswer("language"))
    .then(() => {
        new Promise((res) => {
            res(
                translate(answers.text, {
                    tld: "com",
                    to: answers.language,
                })
            );
        })
            .then((data) => {
                console.log(data.data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
        rl.close();
    });
