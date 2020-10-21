const request = require('request')
const cheerio = require('cheerio')
const {clear} = require('console')
const {log} = require('console')
const {table} = require('console')

clear()
log('\nplease, wait ...\n')

request('https://distrowatch.com/', (err, response, body) => {
    if (!err && response.statusCode === 200) {
        const $ = cheerio.load(body)        
        const top = []
        
        for (let i=0; i<10; i++) {  
            const line = {}

            line.place = +$('.phr1').eq(i).text()
            line.name = $('.phr2').eq(i).text()
            line.loadsPerDay = +$('.phr3').eq(i).text()

            top[i] = line
        }  

        clear()
        log('\n OS TOP10 on', new Date().toLocaleDateString())

        table(top)
    } else {
        log('error: ', err)
    }
})