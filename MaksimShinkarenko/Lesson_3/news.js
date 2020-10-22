const fetch = require('node-fetch')
const cheerio = require('cheerio')

fetch('https://yandex.ru/news')
  .then(res => res.text())
  .then(body => {
    const $ = cheerio.load(body)

    const newsRow = $('.news-card')
    const newsArr= []
    let id = 0

    for (let el in newsRow) {
      if (newsRow[el].name === 'article') {
        newsArr.push({
          id: id,
          header: $(newsRow[el]).find('.news-card__link').text(),
          url: $(newsRow[el]).find('.news-card__link').attr('href'),
          desc: $(newsRow[el]).find('.news-card__annotation').text(),
        })
        id++
      }
    }

    console.log(newsArr)
  })
  .catch(err => console.error(err))