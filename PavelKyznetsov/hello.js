const beep = require('beepbeep')
const chalk = require('chalk')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const colors = [
  'blue',
  'green',
  'white',
  'red',
  'yellow'
]

rl.question('Введите текст какой-нить... ', (text) => {
  beep()

  const resultArray = text.split('').map(s => chalk[colors[Math.floor(Math.random() * colors.length)]](s))
  const result = resultArray.join('')
  console.log(result)
  rl.close()
})