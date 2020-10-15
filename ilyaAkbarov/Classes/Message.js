const chalk = require('chalk')

class Message {
  constructor(text, color) {
    this.text = text
    this.color = color
  }
  
  showMessage() {
    console.log(chalk[this.color](this.text))
  }
}

module.exports = Message
