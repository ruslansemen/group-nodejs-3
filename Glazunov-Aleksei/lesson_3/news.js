const request = require('request')
const cheerio = require('cheerio')

// получаем первые новости по списку, переходим в каждую и дополнительно сохраняем преамбулу
request('https://rbc.ru/', (err, response, body) => {
    if(!err && response.statusCode === 200){
        const $ = cheerio.load(body)
        const quantityNews = 5, topNews = {} 
        let counter = 0
        // берем элементы с атрибутом заголовка новости и пробегаемся по ним
        const newsList = $('span[data-vr-headline]').slice(0,quantityNews).each((idx, elem)=>{
            
            //считываем адрес страницы с новостью, записываем в объект заголовок и адрес новости
            const urlPage = $(elem).parents('a').attr('href')
            topNews[idx] = [urlPage]
            topNews[idx].push($(elem).text())
            
            // переходим на страницу с новостью, берем оттуда преамбулу и пишем в объект
            request('https://' + urlPage.slice(12), (err, response, body) => {
                if(!err && response.statusCode === 200){
                    const $ = cheerio.load(body)
                    topNews[idx].push($('.article__text__overview span').text())
                    counter++
                    // выводим получившийся объект в консоль (можно его преобразовать в JSON при необходимости)
                    if (counter==quantityNews) console.log(topNews)
                }
            })
        })
    }
})