const request = require('request')
const cheerio = require('cheerio')

request('https://www.banki.ru/products/currency/', (err, response, body) => {
  if(!err &&  response.statusCode === 200){
    console.log('Все данные успешно получены')
    const $ = cheerio.load(body)


    const usdData = $('.cb-current-rates__list__item').eq(0).find('td').eq(1).text()
    //const usdData = $('tr[data-currency-code="USD"]').find('td').eq(1).text()
    console.log(`Курс USD: ${usdData}`)
  }
})