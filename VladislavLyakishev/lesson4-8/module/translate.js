const google = require('translate-google')
   

const cmd = ['one', 'hello']

google(cmd, {from: 'en', to: 'ru'}).then(res => {
    console.log(res)
}).catch(err => {
    console.error(err)
})




