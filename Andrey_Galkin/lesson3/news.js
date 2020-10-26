const request = require('request')
const cheerio = require('cheerio')

class News {
  constructor(settings) {
    this.url = settings.url;
    this.elementsSelector = settings.elementsSelector;
    this.elementSelector = settings.elementSelector;
  }

  init() {
    request(this.url, (err, response, body) => {
      if(!err && response.statusCode === 200){
        const $ = cheerio.load(body);

        const text = $(this.elementsSelector).eq(0).find(this.elementSelector).text();
        console.log(`Последня новость: ${text}`);
      }
    })
  }
}

let settings = {
  url: 'https://www.kommersant.ru/',
  elementsSelector: '.b-newsline__list li',
  elementSelector: '.article_subheader > a'
};

(new News(settings)).init();


