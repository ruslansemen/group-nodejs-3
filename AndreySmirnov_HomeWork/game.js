const readline = require('readline')
const chalk = require('chalk')
const fs = require('fs')

class HeadsAndTails {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        this.question = 1
        this.answer = 2
        this.win = false
        this.backGround = (text) => chalk.black.bgWhite(text)
    }

    setRandomQuestion() {
        const min = 1
        const max = 2
        this.question = Math.floor(min + Math.random() * (max + 1 - min))
    }

    newGame() {
        fs.readFile(`./stats.json`, 'UTF-8', (err, data) => {
            if (err) {
                throw Error
            } else {
                const gameData = {
                    wins: 0,
                    loses: 0,
                    winstreak: 0,
                    losestreak: 0,
                    maxWinstreak: 0,
                    maxLosestreak: 0
                }
                fs.writeFile(`./stats.json`, JSON.stringify(gameData), (err) => {
                    if (err) {
                        throw Error
                    }
                })
            }

        })
    }

    setStats() {
        fs.readFile(`./stats.json`, 'UTF-8', (err, data) => {
            if (err) {
                throw Error
            } else {
                if (this.win) {
                    const gameData = JSON.parse(data)
                    gameData.wins = gameData.wins + 1
                    gameData.winstreak = gameData.winstreak + 1
                    if (gameData.maxLosestreak < gameData.losestreak) {
                        gameData.maxLosestreak = gameData.losestreak
                    }
                    gameData.losestreak = 0
                    fs.writeFile(`./stats.json`, JSON.stringify(gameData), (err) => {
                        if (err) {
                            throw Error
                        }
                    })
                } else {
                    const gameData = JSON.parse(data)
                    gameData.loses = gameData.loses + 1
                    gameData.losestreak = gameData.losestreak + 1
                    if (gameData.maxWinstreak < gameData.winstreak) {
                        gameData.maxWinstreak = gameData.winstreak
                    }
                    gameData.winstreak = 0
                    fs.writeFile(`./stats.json`, JSON.stringify(gameData), (err) => {
                        if (err) {
                            throw Error
                        }
                    })
                }
            }
        })
    }

    showStats(){
        fs.readFile(`./stats.json`, 'UTF-8', (err, data) => {
            if (err) {
                throw Error
            } else {
                const gameData = JSON.parse(data)
                console.log(`Total number of games: ${gameData.wins + gameData.loses}`)
                console.log(`Total number of wins: ${gameData.wins}`)
                console.log(`Total number of loses: ${gameData.loses}`)
                console.log(`Max win streak: ${gameData.maxWinstreak}`)
                console.log(`Max lose streak: ${gameData.maxLosestreak}`)
            }
        })
    }

    checkAnswer() {
        if (this.answer === this.question) {
            console.log(`${chalk.green('The answer is correct!')}`)
            this.win = true
            this.setStats()
            this.setRandomQuestion()
            console.log("I've already drop a coin! Waiting for your answer...")
        } else {
            console.log(`${chalk.green('Sorry, you are wrong...')}`)
            this.win = false
            this.setStats()
            this.setRandomQuestion()
            console.log("I've already drop a coin! Waiting for your answer...")
        }
    }

    start() {
        console.log('Welcome to the Heads and Tails game. Please, type "help" if you need any assistance')
        this.setRandomQuestion()

        this.rl.on("line", cmd => {
            switch (cmd) {
                case 'exit':
                    console.log('Thank you for the gaming!')
                    this.win = null
                    this.rl.close()
                    break

                case '1':
                    this.answer = +cmd
                    this.checkAnswer()
                    break

                case '2':
                    this.answer = +cmd
                    this.checkAnswer()
                    break

                case 'new game':
                    console.log('New game was started')
                    this.newGame()
                    break

                case 'result':
                    this.showStats()
                    break

                case 'help':
                    console.log(`
                ${chalk.yellowBright('Available commands:')}
                    - ${this.backGround('new game')} - start a new game and clear previous win/lose statistic
                    - ${this.backGround('1')} - answer is heads
                    - ${this.backGround('2')} - answer is tails
                    - ${this.backGround('result')} - get the information about the game stats
                    - ${this.backGround('exit')} - exit the game
            `)

                default:
                    console.log('Please, check entered data. Use "help" to receive information about commands')
            }
        })
    }
}

(new HeadsAndTails()).start()