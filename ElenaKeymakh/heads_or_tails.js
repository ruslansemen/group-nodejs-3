const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.output
})

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

console.log('Сыграем в игру Орел или Решка! Вводи 0 - это решка, 1 - это орел. Удачи!')

rl.on('line', (cmd)  => {
  let result = getRandomInt(2)
  if(cmd === result){
    console.log('Угадали!')
  } else {
    console.log('Попробуй еще!')
  }
})