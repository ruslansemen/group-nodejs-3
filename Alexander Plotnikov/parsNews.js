const PORT = 3000
const http = require('http')
const request = require('request')
const cheerio = require('cheerio')
const link =
  'https://fighttime.ru/news/item/22902-boj-islama-makhacheva-i-rafaelya-dos-anosa-snova-v-sile.html'

http
  .createServer((req, res) => {
    request(link, function (error, response, body) {
      let $ = cheerio.load(body)
      res.writeHead(200)
      res.end($('#post-area').html())
    })
  })
  .listen(PORT)
console.log(`Server has been started on http://localhost:${PORT}`)

