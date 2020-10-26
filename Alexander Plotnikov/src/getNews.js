const cheerio = require('cheerio')
const link = 'https://lenta.ru/'
const fetch = require('node-fetch')
let getNews = async () => {
  let res = await fetch(link)
  let body = await res.text()
  let $ = cheerio.load(body)
  let news = []
  $('body div.b-yellow-box__wrap div.item').each(function (i, el) {
    let title = $(this).find('a').text()
    let link = 'https://lenta.ru/'+ $(this).find('a').attr('href')
    news.push({ title, link })
  })
  return news
}

getNews()

module.exports = getNews
