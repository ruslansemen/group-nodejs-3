const readline = require('readline')
const fs = require('fs')
const path = require('path')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.output,
})

let parts = 0
let winParts = 0
let lostParts = 0
let allPartyResults = []
let bigString = ''
function onLoadGame (logFile){
    console.log ('Угадайте число 1 или 2, нажимая соответствующие клавиши и enter')
    console.log ('Когда захотите закончить игру, нажмите клавишу e и enter')
    rl.on('line', (cmd) => {
        let partyResult = {
            'numberOfParty': 0,
            'usersNumber': '',
            'randomNumber': '',
            'resultOfParty': '',
        }        
        let b = (Math.random()*10 <= 5) ? 1 : 2 
        let a = `${cmd}`
        if (a === 'e'){
            rl.close()           
            allPartyResults.forEach (function(item) {
                bigString += JSON.stringify(item) + ';'                 
            })
            fs.writeFileSync(path.join(__dirname, logFile), bigString.substring(0, bigString.length-1))                               
        } else
        if (a == b)  {
            parts +=1
            partyResult.numberOfParty = parts
            partyResult.usersNumber = a
            partyResult.randomNumber = b
            winParts += 1
            partyResult.resultOfParty = 'Win'
            allPartyResults.push(partyResult)         
            console.log(b, ' Угадали!')
        } else 
        if ((a != b) && ((a == '1') || (a == '2'))) {
            parts +=1
            partyResult.numberOfParty = parts
            partyResult.usersNumber = a
            partyResult.randomNumber = b
            lostParts += 1
            partyResult.resultOfParty = 'Lost'
            allPartyResults.push(partyResult)         
            console.log(b, 'Нет...')
        } else {
            console.log ('Вводите предложенные символы!!!')
        }
        
        
    })
}
onLoadGame('lesson2_1.json')
