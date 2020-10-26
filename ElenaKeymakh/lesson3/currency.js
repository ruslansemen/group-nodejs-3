const request = require('request')

request('https://www.docker.com/', (err, response, body) => {
  if(!err &&  response.statusCode === 200){
    console.log('Все данные успешно получены')
    console.log(body)
    console.log('Все данные успешно получены')
  }
})