const Promise = require("bluebird");
const randomNumber = require("random-number-csprng");
const readlineSync = require('readline-sync');
let readline = require('readline');

// Promise.try(function() {
//     return randomNumber(0, 1);
// }).then(function(number) {
//     console.log("Your random number:", number);
// }).catch({code: "RandomGenerationError"}, function(err) {
//     console.log("Something went wrong!");
// });


let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Ввведите 0 ли 1 >'
});
rl.prompt();
rl.on('line', (input) => {
    input = input.toLowerCase();
    console.log(input);
    rl.close();
});

// const userName = readlineSync.question('Как тебя зовут? ', 'utf-8');
// const userNamber = readlineSync.question('Hit 1...5 key: ', {limit: '$<1-5>'});
// console.log('Вы ввели ', userNamber);