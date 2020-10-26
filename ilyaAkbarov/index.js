const fetch = require('node-fetch')
const cheerio = require('cheerio')

const fetchData = async (url) => {
  try {
    const response = await fetch(url)
    return await response.text()
  } catch (error) {
    console.log('error: ', error)
  }
}

fetchData('https://ria.ru/world/').then(body => {
  const $ = cheerio.load(body)
  $('.rubric-list').find('.list-item').map(function() {
    const title = $(this).find('.list-item__title').text()
    console.log(title)
    console.log('-------------------------------------')
  })
})
