const fetch = require('node-fetch')
const cheerio = require('cheerio')

fetch('https://yandex.ru/news')
  .then(res => res.text())
  .then(body => {
    const $ = cheerio.load(body)

    const newsRow = $('.news-card')
    const newsArr= []

    for (let el in newsRow) {
      if (newsRow[el].name === 'article') {
        newsArr.push({
          header: $(newsRow[el]).find('.news-card__link').text(),
          url: $(newsRow[el]).find('.news-card__link').attr('href'),
          desc: $(newsRow[el]).find('.news-card__annotation').text(),
        })
      }
    }

    console.log(newsArr)
  })
  .catch(err => console.error(err))