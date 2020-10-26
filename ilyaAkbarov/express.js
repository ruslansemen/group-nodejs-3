const index = require('express')

const app = index()

app.get('/', (req, res) => {
  res.send('hello world. index')
})

app.listen(4000, () => {
  console.log('https://loacalhost:4000')
})
