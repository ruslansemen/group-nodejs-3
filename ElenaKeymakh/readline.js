const readline = require('readline')
//console.log(readline)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.output
})

rl.on('line', (cmd) => {
  console.log(`Entered: ${cmd}`)
  if(cmd === 'exit' || cmd === 'e'){
    rl.close()
  }

})