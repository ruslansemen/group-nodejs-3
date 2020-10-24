const express = require('express')
const hbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const path = require('path')
const users = require('./data/users')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static('public'))

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
}))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.status(200).send('Hello, express.js!')
})

app.get('/users', (req, res) => {
  res.render('users', {users})
})

app.post('/users', (req, res) => {
  console.log(req.body.a)
   res.status(200).send(`Ответ на post-запрос: ${req.body.a}`)
})

app.get('/users/:username', (req, res) => {
  const {username} = req.params

  const user = users[username]

  if(!user){
      res.status(404).render('error')
  }

  res.render('user', {user})
})



app.listen(4000, () => {
  console.log('сервер: http://localhost:4000')
})