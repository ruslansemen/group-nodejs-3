const express = require('express')
const hbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const path = require('path')
const request = require('request')
const cheerio = require('cheerio')

const app = express()

let settings = {
  url: 'https://www.kommersant.ru/',
  elementsSelector: '.b-newsline__list li',
  elementSelector: '.article_subheader > a'
};

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
  request(settings.url, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      const $ = cheerio.load(body);

      let count = req.cookies.count ? req.cookies.count : 1

      let news = []

      for (let i = 0; i < count; i++) {
        news.push($(settings.elementsSelector).eq(i).find(settings.elementSelector).text())
      }
      res.render('news', {count, news})
    }
  })
})


app.post('/config', (req, res) => {
  const {count} = req.body

  if(typeof count !== 'undefined') {
    res.cookie('count', count)
  }
  res.redirect('/')
})

app.get('*', (req, res) => {
  res.status(404).render('error')
})

app.listen(4000, () => {
  console.log('http://localhost:4000')
})