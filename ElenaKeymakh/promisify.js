const {promisify} = require('util')

/**const promisify = (callback) => {
  return function (){
    const argumentsForPromise = [].slice.call(arguments)
    console.log(argumentsForPromise)

    return new Promise(((resolve, reject) => {
      argumentsForPromise.push((error, result) => {
        if(error){
          return reject(error)
        }
        if(arguments.length <= 2){
          resolve(result)
        } else {
          resolve([].slice.call(arguments, 1))
        }
      })
      callback.apply(null, argumentsForPromise)
    }))
  }
}*/

const funcDivide = (numberA, numberB, callback) => {
  setTimeout(() => {
    if(typeof (numberA) !== 'number' || typeof (numberB) !== 'number' || numberB === 0){
      callback(new Error('Invalid numbers'))
    }
    callback(null, numberA / numberB)
  }, 1500)
}

const promise = promisify(funcDivide)

promise(200, 10)
  .then((result) => {console.log(result)})
  .catch((error) => {console.log(error)})