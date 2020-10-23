const express = require('express')
const {scrape} = require('./lesson3.js')
const hbs = require('express-handlebars')
const path = require('path')

const links = require('./data/links')

const app = express()

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
    if(req.test){
        console.log(req.test)
    } else {
        console.log('Заголовок test не был передан')
    }
    // res.status(200).send('Users!')

    res.render('links', {links})
})

app.get('/links/rossaprimavera',(req,res) => {
    console.log('LOG')
    scrape()
        .then((data) => {
            console.log(data)
            res.render('link', {data})
        })
        .catch((err) => {console.log(err)
            res.render('error')})
})

// app.get('/links/rossaprimavera', (req, res) => {
//
// })
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