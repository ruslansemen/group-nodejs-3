const Promise = require("bluebird");
const randomNumber = require("random-number-csprng");
const readlineSync = require('readline-sync');

Promise.try(function() {
    return randomNumber(0, 1);
}).then(function(number) {
    console.log("Your random number:", number);
}).catch({code: "RandomGenerationError"}, function(err) {
    console.log("Something went wrong!");
});

const userNamber = readlineSync.question('Введите 0 или 1 ');
console.log('Вы ввели ', userNamber);