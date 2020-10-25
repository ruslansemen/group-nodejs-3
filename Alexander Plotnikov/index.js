const PORT = 8001
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const courses = require('./src/getCourses')

app.use(express.static(path.join(__dirname,'src')))

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
  res.render('courses',{c})
})
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
