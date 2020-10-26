const minimistLib = require('minimist')

//console.log(process.argv)

const argv = minimistLib(process.argv.slice(2), {
  default: {
    name: 'Anna',
    email: '1@2.ru',
    help: false,
  },
  alias: {
    h: 'help',
  },
  boolean: ['help'],
  string: ['name', 'email'],
})

console.log(argv, argv.help, argv.name)