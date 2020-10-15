const clc = require("cli-color"); // colors
const beeper = require('beeper'); // beeper

//Colored text
let error = clc.red.bold;
let warn = clc.yellow;
let notice = clc.blue;

console.log(error("Error!"));
console.log(warn("Warning"));
console.log(notice("Notice"));


//Replace symbols
let text = ".........\n" + ". Hello .\n" + ".........\n";
let style = { ".": clc.yellowBright("X") };

process.stdout.write(clc.art(text, style));

//Text in colums format
process.stdout.write(
  clc.columns([
    [clc.bold("First Name"), clc.bold("Last Name"), clc.bold("Age")], ["John", "Doe", 34],
    ["Martha", "Smith", 20], ["Jan", "Kowalski", 30]
  ])
);

// Beeper
beeper('****-*-*');

