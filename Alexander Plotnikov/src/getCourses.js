const PORT = 4000
const cheerio = require('cheerio')
const link = 'https://geekbrains.ru/courses?tab=cour-new#cour-new'
const fetch = require('node-fetch')
const  parse5  =  require ( 'parse5' ) ;

module.exports = async () => {
  let res = await fetch(link)
  let body = await res.text()

  const d =parse5.parse(body)

  //console.log(d.childNodes[1].childNodes[1].childNodes[0].childNodes[8]);

  let $ = cheerio.load(body)
  let number = $('body').find('a.gb-course-card__wrapper').length
  let courses = $('div.gb-course-card').slice(0, number - 1)
  let array = []
  for (let i = 0; i < number - 1; i++) {
    let course = cheerio.load(courses.eq(i).html())
    let link =
      'https://geekbrains.ru/' +
      course('a.gb-course-card__wrapper').attr('href')

    let img = course('a.gb-course-card__wrapper  img').attr('src')
    let title = course('span.gb-course-card__title-text').text()
    let desc = course('div.gb-course-card__subtitle').text()
    array.push({ link, title, img, desc })
  }
  return array
}
