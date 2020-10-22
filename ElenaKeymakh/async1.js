setTimeout(() => {
  console.log('setTimeout()')
}, 1000)

console.log('First')

function sendToServer(callback, time=1000){
  setTimeout(() => {
    const result = 'Test data';
    //callback(new Error('Server error'))
    callback(null, result)
  }, 1000)
}

sendToServer((err, res) => {
  if(err){
    //throw err;
    console.log(err);
    return
  }
  console.log('result:', res)
});