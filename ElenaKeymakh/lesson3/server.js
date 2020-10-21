const http = require('http')
const url = require('url')

http.createServer((req, res) => {
  const query = url.parse(req.url, true)
  console.log(query)

  res.writeHead(200, {
    'Content-Type': 'application/json',

  })

  //res.write('Hello world!')
  res.write(JSON.stringify({message: 'It is works!', href: query.href}))
  res.end()

}).listen(4000)
console.log('http://localhost:4000')