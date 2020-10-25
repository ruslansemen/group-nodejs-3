const express = require('express')
const {scrape} = require('./lesson3.js')
const hbs = require('express-handlebars')
const path = require('path')
const cookieParser = require('cookie-parser')

const links = require('./data/links')

const app = express()

// app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
// app.use(express.static('public'))

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

app.get('/links', (req, res) => {
    if (req.test) {
        console.log(req.test)
    } else {
        console.log('Заголовок test не был передан')
    }
    // res.status(200).send('Users!')

    res.render('links', {links})
})

// app.get('/links/rossaprimavera',(req,res) => {
//     console.log('LOG')
//     scrape()
//         .then((data) => {
//             console.log(data)
//             res.render('link', {data})
//         })
//         .catch((err) => {console.log(err)
//             res.render('error')})
// })

app.get('/links/:mediaName', (req, res) => {
    const mediaName = req.params.mediaName
    res.render('config', {mediaName: mediaName, url: `/links/${mediaName}/result`})
})

app.post('/links/:mediaName/result', (req, res) => {
    if (!req.body) return res.sendStatus(400)
    const {newsCount} = req.body
    console.log(newsCount)
    const result = scrape(req.params.mediaName).then((res) => ({
        mediaName: req.params.mediaName,
        newsCount: newsCount,
        data: res.slice(0, newsCount)
    }))
        .then((data) => {
            console.log(data)
            return res.render('news', {data: data})
        })
        .catch((ERR) => console.log(ERR))


})

app.get('/cookie/get', (req, res) => {
    console.log(req.cookies)
    res.send(JSON.stringify(req.cookies))
})

app.get('/cookie/set', (req, res) => {
    res.cookie('count', Math.floor(Math.random() * 10))
    res.redirect('/cookie/get')
})

// app.post('/links/rossaprimavera', (req, res) => {
//     console.log(req.body)
//     res.status(200).send('Post!')
//     res.render('link', {data})
// })

// app.post('/links', (req, res) => {
//     console.log(req.body)
//     res.status(200).send('Post!')
// })

app.listen(4000, () => {
    console.log('http://localhost:4000')
})