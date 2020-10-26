const http = require('http')
const https = require('https')

https.get('https://www.docker.com/', (result) => {
  console.log(result.statusCode)
  if(+result.statusCode !== 200){
    return
  }
  result.setEncoding('utf8')

  let contentData = '';

  result.on('data', (chunk) => {
    //console.log(chunk.toString())
    //console.log(chunk)

    contentData += chunk
  })
  result.on('end', () => {
    console.log('Все данные успешно получены')
    console.log(contentData)
    console.log('Все данные успешно получены')
  })
}).on('error', (err) => {
  console.log('Error', err)
})