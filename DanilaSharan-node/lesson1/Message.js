const chalk = require('chalk')

class Message {
  constructor(text, color, bg) {
    this.text = text
    this.color = color
    this.bg = bg
  }

  showMessage() {
    console.log(chalk[this.color][this.bg](this.text))

  }
}

module.exports = Message
