const nodemailer = require('nodemailer')

const smtpTransport = nodemailer.createTransport({
  host: 'localhost',
  port: 32025,
  secure: false,
  auth: {
    user: 'username@mail.localdomain',
    pass: '1234',
  },
})

smtpTransport.sendMail({
  from: 'User <username@mail.localdomain>',
  to: 'anna-ivanova@localdomain.local',
  subject: 'Текстовое письмо',
  text: 'Привет! Проверка работоспособности почты',
  html: '<h1>Привет! Проверка работоспособности почты</h1>>'
}, (err, info) => {
  if(err){
    console.log(err)
    throw err
  }
  console.log('Письмо успешно отправлено', info)
  smtpTransport.close()
  })