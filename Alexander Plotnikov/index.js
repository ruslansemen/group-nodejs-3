const PORT = 8001
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const courses = require('./src/getCourses')
const news = require('./src/getNews')
const bodyParser = require('body-parser')
const app = express()


app.use(express.static(path.join(__dirname, 'src')))
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
  res.render('news', { n, title: 'Главные новосмти с сайта lenta.ru' })
})

app.post('/namberNews', (req, res) => {
  console.log(req.body)
  res.json({ result: 'ok' })
})

app.get('*', async (req, res) => {
  res.render('error')
})
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
