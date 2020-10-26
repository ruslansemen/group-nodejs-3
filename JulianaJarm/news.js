const request = require('request')
const cheerio = require('cheerio')
const chalk = require('chalk')

request('http://www.etotupo.ru/', (err, response, body) => {
    if(!err && response.statusCode === 200) {
        const $ = cheerio.load(body)

        const news = $('div.elementor-post__excerpt').slice(0, 4).contents().text()

        console.log(chalk.magenta(`Горячие новости:${news}`))
    }
})



