const fs = require('fs')
const path = require('path')

const {promisify} = require('util')

//Синхронно

const data = fs.readFileSync('./file.txt', 'utf8')
//console.log(data.toString())
console.log(data.toString())

fs.writeFileSync(path.join(__dirname, 'file2.txt'), 'Test7890')

//Асинхронно

fs.readFile(path.join(__dirname, 'file.txt'), 'utf8', (err, data) => {
  if(err){
    throw err
  }
  console.log(data)
})

const promisifyReadFile = promisify(fs.readFile)
promisifyReadFile(path.join(__dirname, 'file.txt'), 'utf8')
  .then((data) => {
    console.log('promisify', data)
  })
.catch((err) => {
  console.log('promisify', err)
})