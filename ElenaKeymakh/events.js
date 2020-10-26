const {EventEmitter} = require('events')

class Test extends EventEmitter {
  constructor(){
    super()
    //this.emit('initA')

    setTimeout(() => {
      this.emit('initA')
      this.emit('initA')
    }, 0)
  }

  start(){
    console.log('start()')
    setTimeout(() => {
      this.emit('ready')
    }, 200)
  }
}

const t1 = new Test

t1.on('initA', () => {
  console.log('Метод init()')
})

t1.on('ready', () => {
  console.log('Метод start1()')
})

t1.on('ready', () => {
  console.log('Метод start2()')
})

t1.start()