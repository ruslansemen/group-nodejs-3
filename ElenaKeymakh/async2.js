const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({name: 'Anna'})
  }, 1000)
})

promise.then(
  (user) => {
    //console.log(user)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        user.colors = ['red', 'yellow', 'orange']
        resolve(user)
      }, 2000)
    })
  },
  (err) => {},
).then((user) => {
  console.log('Result', user)
})