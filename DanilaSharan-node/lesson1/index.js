const Message = require('./Message')
const beep = require('beepbeep')

const messages = [
  new Message('test1', 'blue', 'bgGreen'),
  new Message('test2', 'green', 'bgRed'),
  new Message('test3', 'red', 'bgCyan'),
  new Message('test4', 'yellow', 'bgGray'),
  new Message('test5', 'gray', 'bgWhite'),
]

messages.forEach(message => message.showMessage())

beep([800, 800, 800, 1000, 500, 500]) //играем мелодию, жаль нота всего одна

