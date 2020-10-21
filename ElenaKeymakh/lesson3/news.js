const request = require('request')
const cheerio = require('cheerio')

request('https://yandex.ru/news/', (err, response, body) => {
  if(!err &&  response.statusCode === 200){
    const $ = cheerio.load(body)

    const newsTitle = $('.news-card__title').eq(0).text()

    const newsText = $('.news-card__annotation ').eq(0).text()

    console.log(`Заголовок: ${newsTitle}`)
    console.log(`Текст новости: ${newsText}`)
  }
  })
