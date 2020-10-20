// const https = require('https')
const request = require('request')

request('https://rossaprimavera.ru', (err, response,body) => {
    if(!err && response.statusCode === 200) {
        console.log('Все данные успешно получены')
        console.log(body)
        console.log('Все данные успешно получены')
    }
})
// https.get('https://rossaprimavera.ru', (result) => {
//     console.log(result.statusCode)
//     if (result.statusCode !==200) {
//         return
//     }
//     result.setEncoding ('utf8')
//
//     let contentData = ''
//     result.on('data', (chunk) => {
//         // console.log(chunk)
//         contentData += chunk
//     })
//     result.on('end', () => {
//         console.log('Все данные успешно получены')
//         console.log(contentData)
//     })
// }).on('error', (err) => (
//     console.log('Error', err)
// ))