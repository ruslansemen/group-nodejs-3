const express = require('express')

const app = express()

app.use((req, res, next) => {
    console.log('Middleware 4')
    // console.log(req.headers)

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
})

app.get('/users', (req, res) => {
    res.status(200).send('Users!')
})


app.listen(4000, () => {
    console.log('http:/localhost:4000')
})

