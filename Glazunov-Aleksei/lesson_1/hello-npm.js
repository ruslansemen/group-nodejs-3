var ansi = require("ansi")
var cursor = ansi(process.stdout)
const User = require('./User')

cursor.white().bg.green().write('Test message!').reset().bg.reset().write('\n')
console.log("Hello!")
console.log(User.data())

cursor.beep()