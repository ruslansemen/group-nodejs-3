const {EventEmitter} = require('events')
const minimistLib = require('minimist')
const readline = require('readline')
const fs = require('fs')


class Game extends EventEmitter {
    constructor() {
        super();
    }

}

const argv = minimistLib(process.argv.slice(2), {
    default: {
        playerGuess: '',
        win: false,
    }
})

/*
1) Написать консольную игру "Орел или решка", в которой надо будет
угадывать выпадающее число (1 или 2).
В качестве аргумента
программа может принимать имя файла для логирования
результатов каждой партии.

2) Сделать программу-анализатор игровых логов. В качестве
аргумента программа получает путь к файлу. Выведите игровую
статистику: общее количество партий, количество выигранных /
проигранных партий и их соотношение, максимальное число побед /
проигрышей подряд.
 */