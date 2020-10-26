const translate = require('google-translate-open-api')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const translateText = async text => {
  const result = await translate.default(text, {
    to: "ru",
  });
  return result.data[0];
}

rl.setPrompt('Type text: ');
rl.prompt();
rl.on('line', (line) => {
  translateText(line).then(result => {
    console.log(result)
    rl.prompt()
  })
})
