const express = require('express')
const hbs = require('express-handlebars')
const path = require('path ')


const app = express()

app.use(express.json())

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'default',
    layoutsDir: path.json(__dirname, 'views', 'layouts'),
    partialsDir: path.json(__dirname, 'views', 'partials'),
}))
app.set('view enjine', 'hbs')

app.use((req, res, next) => {
    console.log('Middleware 4')
    if(req.headers.test === '1234'){
        req.test = 'Передан пользовательский заголовок test!'
    }
    next()
})

app.get('/', (req, res) => {
    res.status(200).send('Hello, express.js')
})

app.get('/users', (req, res) => {
    if(req.test){
        console.log(req.test)
    } else {
        console.log('Заголовок test не был передан')
    }
    req.render('users', {layout: 'default'})
})

app.post('/users', (req, res) => {
    res.status(200).send('Post!')
})

app.get('/users', (req, res) => {
    res.status(200).send('Users!')
})


app.listen(4000, () => {
    console.log('http:/localhost:4000')
})

