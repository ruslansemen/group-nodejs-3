const faker = require('faker');
faker.locale = "ru";

const colors = require('colors');

// Faker Str
const fullName = faker.fake("{{name.firstName}} {{name.lastName}}");

const age = faker.fake("{{random.number}}")

const companyName = faker.company.companyName();

const email = faker.internet.email();

const str = `Здравствуйте, меня зовут ${fullName.green}, мне ${age.red} лет. Я работаю в компании ${companyName.blue}. Можете написать мне по адресу ${email.yellow} - хотя я все равно не отвечу...`;


console.log(str);