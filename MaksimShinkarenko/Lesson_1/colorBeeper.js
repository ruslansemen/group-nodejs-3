const styles = require('chalk')
const beeper = require('beeper')

console.log(styles.yellowBright.bgBlue('Жёлтый текст на синем фоне скоро запикает'));

(async () => {
    await beeper('**--')
        .then(()=>{
            console.log(styles.yellowBright.bgBlue('**'))
        })
    await beeper('**--')
        .then(()=>{
            console.log(styles.yellowBright.bgBlue('**'))
        })
    await beeper('****')
        .then(()=>{
            console.log(styles.yellowBright.bgBlue('****'))
        })

})()