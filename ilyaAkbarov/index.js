const chalk = require('chalk')

const messages = [
  { color: 'blue', text: 'test1'},
  { color: 'green', text: 'test2'},
  { color: 'red', text: 'test3'},
  { color: 'yellow', text: 'test4'},
  { color: 'gray', text: 'test5'},
]

messages.forEach(({ color, text }) => {
  console.log(chalk[color](text))
})
