const request = require('request')
const cheerio = require('cheerio')
const chalk = require('chalk')

request('http://www.etotupo.ru/', (err, response, body) => {
    if(!err && response.statusCode === 200) {
        const $ = cheerio.load(body)

        const news = $('h3.elementor-post__title').slice(0,4).text()

        console.log(chalk.magenta(`Горячие новости:${news}`))
    }
})

/*
1) Создать программу для получения информации о последних
новостей с выбранного вами сайта в структурированном виде.
2) Создать переводчик слов с английского на русский, который будет
обрабатывать входящие GET запросы и возвращать ответы,
полученные через API Яндекс.Переводчика.
 */