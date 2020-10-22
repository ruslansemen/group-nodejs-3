const request = require('request')
const cheerio = require('cheerio')

request('https://www.mk.ru', (err, response, body) => {
    if(!err && response.statusCode === 200){
        console.log('Все данные успешно получены!')
        const $ = cheerio.load(body)
        const k = $('.header__social-item').find('a').length

        console.log('***********************************************')
        for (let i = 0; i < k; i++){
            let name = $('.header__social-item').find('a').eq(i).find('span').text()
            let link = $('.header__social-item').find('a').eq(i).attr('href')
            console.log (`Чтобы перейти к ${name} \n перейдите по ссылке \n ${link}`)
            console.log ('-----------------------------------------------')
        }
       console.log('***********************************************')
       
    }
})