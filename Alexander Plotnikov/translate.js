const translate = require('@vitalets/google-translate-api')
const readline = require('readline')
const chalk = require('chalk')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log(
  chalk.green("Input word ot expration to translate or 'exit' to exit")
)

rl.on('line', async (input) => {
  if (input === 'exit') {
    rl.close()
  } else {
    try {
      let res = await translate(input, { from: 'en', to: 'ru' })
      console.log(chalk.yellow(res.text))
      console.log(
        chalk.green("Input word ot expration to translate or 'exit' to exit")
      )
    } catch (e) {
      console.log(e)
    }
  }
})
