const request = require('request')
const cheerio = require('cheerio')

request('https://yandex.ru/news', (err, response, body) => {
  if(!err && response.statusCode === 200){
    const $ = cheerio.load(body)
    const news = $('.news-card__annotation').toArray().map(e => $(e).text());
    console.log(news)
    return news;
  }
})

