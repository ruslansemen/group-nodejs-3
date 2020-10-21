const translate = require('translate-google')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.output
})

console.log('Это англо-русский переводчик. Когда замигает курсов, вводи слово и жди перевод.')

rl.on('line', (cmd) => {
  translate(cmd, {to: 'ru'}).then(res => {
    console.log(res)
  }).catch(err => {
    console.error(err)
  })
  if(cmd === 'exit' || cmd === 'e'){
    rl.close()
  }
})
