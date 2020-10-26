const PORT = 8001
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const courses = require('./src/getCourses')
const news = require('./src/getNews')
const bodyParser = require('body-parser')
const app = express()
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'src')))
// не работает,  express.urlencoded тоже неработает
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine(
  '.hbs',
  exphbs({
    extname: '.hbs',
    defaultLayout: 'default',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
  })
)
app.set('view engine', '.hbs')

app.get('/', async (req, res) => {
  let c = await courses()
  res.render('courses', { c, title: 'Список курсов GeekBrains' })
})
app.get('/news', async (req, res) => {
  let n = await news()
  let max = n.length
  let arrNews = []
  let current = arrNews.length || 1
  n.forEach((e, i) => {
    i < +req.cookies.number && arrNews.push(e)
  })
  console.log(arrNews)
  res.render('news', {
    arrNews,
    max,
    current,
    title: 'Главные новости с сайта lenta.ru',
  })
})

app.post('/namberNews/:number', (req, res) => {
  //выдает пустое боди
  //console.log(req.body)
  res.cookie('number', req.params.number)
  res.json({ result: true })
})

app.get('*', async (req, res) => {
  res.render('error')
})
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
