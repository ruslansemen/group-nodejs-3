async function test(){
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({name: 'Anna'})
    }, 1000)
  })

  const result = await promise
  console.log(result)
}

test()
