const request = require('request')
const cheerio = require('cheerio')
const colors = require('colors')



request('https://yandex.ru/news/', (err, response, body) => {
    const newsArr = []
    const linksArr = []
    if (!err && response.statusCode === 200){
        const $ = cheerio.load(body)
        const elem = $('a[class=news-card__link]').each(function(i, elem){
            newsArr.push($(elem).text())
        })
    }
    process.stdout.write(`Последние новости с Яндекса...\n`.green)
    newsArr.forEach((element, i) => {
        process.stdout.write(`${i+1}) ${element}\n`)
    })
    process.stdout.write(`Загрузка новостей с Яндекса закончена...\n`.green)
})