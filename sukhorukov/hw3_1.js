const request = require('request')
const cheerio = require('cheerio')

console.clear()
console.log('\nplease, wait ...\n')

request('https://distrowatch.com/', (err, response, body) => {
    if(!err && response.statusCode === 200) {
        const $ = cheerio.load(body)        
        const top = []
        
        for (let i=0; i<10; i++) {  
            const line = {}
            line.place = +$('.phr1').eq(i).text()
            line.name = $('.phr2').eq(i).text()
            line.loadsPerDay = +$('.phr3').eq(i).text()
            top[i] = line
        }  

        console.clear()
        console.log('\n OS TOP10 on', new Date().toLocaleDateString())
        console.table(top)
    } else {
        console.log('error: ', err);
    }
})