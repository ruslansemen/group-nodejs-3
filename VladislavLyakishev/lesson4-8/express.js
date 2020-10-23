const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')
//MyModul
const selectCount = require('./db/selectCount')
const selectLang = require('./db/selectLang')
const newsArr = require('./module/parser')


const app = express()

//Middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

// Engine Express Handlebars
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: path.join( __dirname, 'views', 'layouts'),
    partialsDir: path.join( __dirname, 'views', 'partials')
}))
// App Set
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    const params = req.cookies.params ? req.cookies.params : {count: 5000000, lang: 'ru'}
    const date = (new Date).toLocaleDateString()
    const newsCount = []
    newsArr.forEach( (elem, i) => {
        if (i < params.count) {
            newsCount.push(elem)
        }
    })
    res.render('index', {date, params, selectCount, selectLang, newsCount})
})

app.post('/', (req, res) => {
    const params = req.body
    if (params.save === 'Сохранить'){
        res.cookie('params', params)
        res.redirect('/')
    }
})



app.listen(3000)