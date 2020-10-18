const table = require('table')
const chalk = require('chalk')
const minimist = require('minimist')
const readline = require('readline')

var fs = require('fs')
var argv = require('minimist')(process.argv.slice(2))

var logging = false

if(argv['log']) {
    logging = true
}

var userCardsOnHand = []
var compCardsOnHand = []
var userScore = 100

let cards = [
    {title: ' 2', score: 2},
    {title: ' 3', score: 3},
    {title: ' 4', score: 4},
    {title: ' 5', score: 5},
    {title: ' 6', score: 6},
    {title: ' 7', score: 7},
    {title: ' 8', score: 8},
    {title: ' 9', score: 9},
    {title: '10', score: 10},
    {title: ' J', score: 10},
    {title: ' Q', score: 10},
    {title: ' K', score: 10},
    {title: ' A', score: 11},
]

let suits = [
    { suite: '♠', color: 'black'},
    { suite: '♣', color: 'black'},
    { suite: '♥', color: 'red'},
    { suite: '♦', color: 'red'},
]

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '\nstart - начать\nexit - выйти\nscore - баланс\n\n'
})

function getRandomCard() {
    let titleRand = Math.floor(Math.random() * (cards.length))
    let suitRand = Math.floor(Math.random() * (suits.length))
    let title = cards[titleRand]['title']
    let score = cards[titleRand]['score']
    let isA = cards[titleRand]['title'] == ' A' ? true : false
    let suit = suits[suitRand]['suite']
    let color = suits[suitRand]['color']
    let card = {'card': title+suit, 'score': score, 'color': color, 'isA': isA}
    return card;
}

function getCardsOnHand(hand,out) {
    var cardsOnHandStr = ''
    var cardsOnHandStrToReturn = ''
    hand.forEach((element) => {
        if(element['color'] == 'red') {
            cardsOnHandStr += chalk.red.bgWhite(element['card'])+' '
            cardsOnHandStrToReturn += element['card']+' '
        } else {
            cardsOnHandStr += chalk.black.bgWhite(element['card'])+' '
            cardsOnHandStrToReturn += element['card']+' '
        }
    })
    if(out=='show') {
        console.log(cardsOnHandStr+'- '+checkScoreInHand(hand))
    } else if(out=='get') {
        return cardsOnHandStrToReturn
    }
}

function checkScoreInHand(hand) {
    var cardsOnHandSum = 0
    var cardsOnHandSumWithA = []
    var hasA = 0

    hand.forEach(function(element, i, arr) {
        if(element['isA']) {
            hasA++
        }        
        cardsOnHandSum += element['score']
    })
    if(hasA > 0) {
        cardsOnHandSumWithA.push(cardsOnHandSum)
        for(var i=1;i<=hasA;i++) {
            cardsOnHandSumWithA.push(cardsOnHandSum - 9 * i)
        }
        var cardsOnHandSumWithAFiltered = cardsOnHandSumWithA.filter(function(number) {
            return number <= 21;
        })
        cardsOnHandSum = cardsOnHandSumWithAFiltered.length>0 ? Math.max.apply(null, cardsOnHandSumWithAFiltered) : cardsOnHandSum
    }
    
    return cardsOnHandSum
}

function log(data) {
    fs.appendFile('./log.txt', data, 'utf8', function (err, data) {
        if(err) throw err
    })
}

function gameOver() {
    var gameResults = '';
    console.log('Вы:')
    getCardsOnHand(userCardsOnHand,'show')
    if(compCardsOnHand.length > 0) {
        console.log('Противник:')
        getCardsOnHand(compCardsOnHand,'show')
    }
    if((checkScoreInHand(userCardsOnHand) <= 21 && checkScoreInHand(userCardsOnHand) > checkScoreInHand(compCardsOnHand)) || checkScoreInHand(compCardsOnHand) > 21) {
        gameResults = 'Победа\nКарты игрока:\n'+getCardsOnHand(userCardsOnHand,'get')+'\nКарты противника:\n'+getCardsOnHand(compCardsOnHand,'get')+'\n\n'
        console.log('\nПоздравляем, вы выиграли!\nДля продолжения наберите start, для выхода exit\n')
        userScore++
    } else if(checkScoreInHand(userCardsOnHand) <= 21 && checkScoreInHand(userCardsOnHand) == checkScoreInHand(compCardsOnHand)) {
        gameResults = 'Ничья\nКарты игрока:\n'+getCardsOnHand(userCardsOnHand,'get')+'\nКарты противника:\n'+getCardsOnHand(compCardsOnHand,'get')+'\n\n'
        console.log('\nНичья!\nДля продолжения наберите start, для выхода exit\n')
    } else {
        gameResults = 'Проигрыш\nКарты игрока:\n'+getCardsOnHand(userCardsOnHand,'get')+'\nКарты противника:\n'+getCardsOnHand(compCardsOnHand,'get')+'\n\n'
        console.log('\nК сожалению, вы проиграли!\nДля продолжения наберите start, для выхода exit\n')
        userScore--
    }
    if(logging) {
        log(gameResults)
    }
    userCardsOnHand = []
    compCardsOnHand = []
}

function compGetCards() {
    compCardsOnHand.push(getRandomCard())
    compCardsOnHand.push(getRandomCard())
    while(checkScoreInHand(compCardsOnHand)<17) {
        compCardsOnHand.push(getRandomCard())
    }
}

function getScore() {
    console.log('Ваш баланс: '+userScore+'\nДля продолжения нажмите start\n')
}

rl.prompt();
rl.on('line', (input) => {
    console.log('\n')
    if(input == 'start') {
        userCardsOnHand = []
        compCardsOnHand = []
        userCardsOnHand.push(getRandomCard())
        userCardsOnHand.push(getRandomCard())
        getCardsOnHand(userCardsOnHand,'show')
        console.log('\nУкажите действие (0 - хватит, 1 - еще)')
    } else if(input == 'exit') {
        rl.close()
    } else if(input == 'score') {
        getScore()
    } else if(input == 0) {
        compGetCards()
        gameOver()
    } else if(input == 1) {
        userCardsOnHand.push(getRandomCard())
        if(checkScoreInHand(userCardsOnHand) <= 21) {
            getCardsOnHand(userCardsOnHand,'show')
            console.log('\nУкажите действие (0 - хватит, 1 - еще)')
        } else {
            gameOver()
        }
    } else {
        console.log('Укажите действие (0 - хватит, 1 - еще)')
    }
});