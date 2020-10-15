const Message = require('./Classes/Message')

const messages = [
  new Message('test1', 'blue'),
  new Message('test2', 'green'),
  new Message('test3', 'red'),
  new Message('test4', 'yellow'),
  new Message('test5', 'gray'),
]

messages.forEach(message => message.showMessage())
