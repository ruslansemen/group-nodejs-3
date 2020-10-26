const readline = require("readline");
const fs = require("fs");
const path = require("path");
const ansi = require("ansi"),
    cursor = ansi(process.stdout);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Класс Card: хранит название карты (name), ее масть (suit), метод getValue возвращает стоимость карты, toString нужен для вывода карты в виде "A♠", isChosen хранит логическое значение, которое означает, была ли карта выбрана в текущем раунде

class Card {
    constructor(name, suit) {
        this.name = name;
        this.value = this.getValue();
        this.suit = suit;
        this.isChosen = false;
    }

    getValue() {
        switch (this.name) {
            case "J":
            case "Q":
            case "K": {
                return 10;
            }
            case "A": {
                return 11;
            }
            default: {
                return +this.name;
            }
        }
    }

    toString() {
        return this.name + this.suit;
    }
}

// Класс Cards: хранит все названия карт (names), все масти карт (suits), в cards создаются экземпляры класса Card при помощи метода init

class Cards {
    constructor() {
        this.names = [
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "J",
            "Q",
            "K",
            "A",
        ];
        this.suits = ["♠", "♣", "♥", "♦"];
        this.cards = [];

        this.init();
    }

    init() {
        let i = 0;
        while (i < 52) {
            let nameNumber = Math.floor(i / 4);
            let suitNumber = i % 4;
            this.cards.push(
                new Card(this.names[nameNumber], this.suits[suitNumber])
            );
            i++;
        }
        i++;
    }
}

// Класс Blackjack:
// - хранит ссылку на промис (promis), который обнуляется при запуске некоторых методов, чтобы сохранить ссылку на новый промис, создаваемый этими методами
// - в cards хранится массив cards экземпляра класса Cards
// - в rules хранятс правила игры
// - currentRound - содержит информацию о текущем раунде; user - информация о картах игрока, dealer - информация о картах дилера, finishRound - обнуление информации о текущем раунде, toString - выводит информацию о текущем раунде в читаемом виде
// - метод mainMenu - главное меню игры, просит пользователя ввести команду
// - метод handleUserAnswer - обработчик вводимой пользователем команды в главном меню, в зависимости от команды запускает соотвествующий метод класса Blackjack
// - метод typeToContinue - ждет пока пользователь введет что угодно в консоль и запускает mainMenu
// - метод showStats - считывает статистику из файла stats.txt и выводит ее на экран
// - метод writeStats - после окончания текущего раунда записывает результат в файл статистики
// - метод resetStats - сбрасывает статистику игры
// - метод showRules - выводит правила игры на экран
// - метод startRound - запускает новый раунд: игрок и дилер получают две карты, и в зависимости от игровой ситуации, либо раунд завершается (метод finishRound), либо запускается метод userTurn
// - метод userTurn - просит игрока ввести решение о доборе новой карты и запускает обработчик handleUserTurn
// - метод handleUserTurn - в зависимости от ответа игрока выполняет необходимые действия: в случае ответа "yes" - запускает метод userTurn, в случае ответа "no" - запускает метод handleDealerTurns
// - метод handleDealerTurns - автоматически производит ходы дилера и запускает метод finishRound
// - метод finishRound - в зависимости от аргумента message перезаписывает файл статистики с помощью writeStats и запускает метод mainMenu

class Blackjack {
    constructor() {
        this.promise = null;
        this.cards = new Cards().cards;
        this.rules =
            "Правила игры Блекджек:\n-Задача игрока: обыграть дилера, т.е. набрать очков, больше чем дилер, но не более 21.\n-Дилер раздает по две карты себе и игроку. После раздачи карт игрок имеет право взять еще одну карту сколько угодно раз, но чтобы их общая стоимость не превысила 21 очко, либо отказаться от добора карт.\nДалее дилер начинает добирать карты, пока общая стоимость его карт станет не меньше 17.\nЕсли кто-либо из игроков в начале раунда получает карты, общая стоимость которых равна 21, он автоматически побеждает. А если оба игрока получают карты с суммарной стоимостью 21 - это ничья.";
        this.currentRound = {
            user: {
                cards: [],
                value: 0,
                isAceInCards: false,
            },
            dealer: {
                cards: [],
                value: 0,
                isAceInCards: false,
            },
            finishRound() {
                this.user.cards = [];
                this.user.value = 0;
                this.dealer.cards = [];
                this.dealer.value = 0;
            },
            toString() {
                let result = `Карты игрока: ${this.user.cards.map((item) =>
                    item.toString()
                )} Количество очков игрока: ${
                    this.user.value
                }\nКарты дилера: ${this.dealer.cards.map((item) =>
                    item.toString()
                )} Количество очков дилера: ${this.dealer.value}`;
                return result;
            },
        };
    }

    mainMenu() {
        cursor.write("\u001b[1J");
        cursor.goto(0, 0);
        this.promise = null;
        this.promise = new Promise((resolve) => {
            rl.question(
                `Добро пожаловать в игру Блекджек. Для продолжения введите одну из следующих команд:\n"play" - начать игру\n"stats" - посмотреть статистику\n"reset" - сбросить статистику\n"rules" - почитать правила игры\n"exit" - выйти из игры\n\n`,
                (answer) => {
                    resolve(answer);
                }
            );
        })
            .then((answer) => this.handleUserAnswer(answer))
            .catch((err) => {
                console.log(err);
                rl.close();
            });
    }

    handleUserAnswer(answer) {
        switch (answer) {
            case "play": {
                this.startRound();
                break;
            }
            case "stats": {
                this.showStats();
                break;
            }
            case "reset": {
                this.resetStats();
                break;
            }
            case "rules": {
                this.showRules();
                break;
            }
            case "exit": {
                console.log("Выход из игры...");
                rl.close();
                break;
            }
            default: {
                console.log("Такой команды нет! Попробуйте еще раз!");
                this.promise = null;
                this.promise = new Promise((resolve) => {
                    rl.question("Введите любое сообщение...\n", () => {
                        resolve();
                    });
                }).finally(() => {
                    this.mainMenu();
                });
            }
        }
    }

    typeToContinue() {
        this.promise = null;
        this.promise = new Promise((resolve) => {
            rl.question("Введите любое сообщение...\n", () => {
                resolve();
            });
        }).finally(() => {
            this.mainMenu();
        });
    }

    showStats() {
        const stats = fs.readFileSync("./stats.txt", "utf8");
        console.log(stats);

        this.typeToContinue();
    }

    writeStats(message) {
        const stats = fs.readFileSync("./stats.txt", "utf8");

        const statsNumbers = stats.match(/\d/g).map((x) => +x);

        switch (message) {
            case "victory": {
                statsNumbers[0] += 1;
                break;
            }
            case "draw": {
                statsNumbers[1] += 1;
                break;
            }
            case "defeat": {
                statsNumbers[2] += 1;
            }
        }

        statsNumbers[3] += 1;
        statsNumbers[4] = (statsNumbers[0] / statsNumbers[3]) * 100;

        const finalStats = `Количество побед: ${
            statsNumbers[0]
        }.\nКоличество ничей: ${statsNumbers[1]}.\nКоличество поражений: ${
            statsNumbers[2]
        }.\nКоличество игр: ${
            statsNumbers[3]
        }.\nВинрейт: ${statsNumbers[4].toFixed(2)}%
        `;

        fs.writeFileSync(path.join(__dirname, "stats.txt"), finalStats);
    }

    resetStats() {
        const stats = fs.readFileSync("./stats.txt", "utf8");

        const statsNumbers = [0, 0, 0, 0, 0];

        const finalStats = `Количество побед: ${
            statsNumbers[0]
        }.\nКоличество ничей: ${statsNumbers[1]}.\nКоличество поражений: ${
            statsNumbers[2]
        }.\nКоличество игр: ${
            statsNumbers[3]
        }.\nВинрейт: ${statsNumbers[4].toFixed(2)}%
        `;

        fs.writeFileSync(path.join(__dirname, "stats.txt"), finalStats);
        console.log("Статистика сброшена!");
        this.typeToContinue();
    }

    showRules() {
        console.log(this.rules);
        this.typeToContinue();
    }

    startRound() {
        // Раздается кон...
        console.log("Начало раунда:");
        this.getCard("user");
        this.getCard("user");
        this.getCard("dealer");
        this.getCard("dealer");
        console.log(this.currentRound.toString());

        const userValue = this.currentRound.user.value;
        const dealerValue = this.currentRound.dealer.value;

        if (userValue == 21 || dealerValue == 21) {
            if (userValue == 21 && dealerValue == 21) {
                this.finishRound("draw");
            } else if (userValue == 21) {
                this.finishRound("victory");
            } else {
                this.finishRound("defeat");
            }
        } else {
            this.userTurn();
        }
    }

    userTurn() {
        this.promise = null;
        this.promise = new Promise((resolve) => {
            rl.question(
                'Желаете взять еще карту? Напишите "yes" или "no"\n',
                (answer) => {
                    resolve(answer);
                }
            );
        })
            .then((answer) => this.handleUserTurn(answer))
            .catch((err) => {
                console.log(err);
                rl.close();
            });
    }

    handleUserTurn(answer) {
        const formattedAnswer = answer.toLowerCase().trim();
        switch (formattedAnswer) {
            case "yes": {
                this.getCard("user");
                console.log(this.currentRound.toString());

                const userPoints = this.currentRound.user.value;

                if (userPoints >= 21) {
                    if (userPoints == 21) {
                        this.finishRound("victory");
                    } else {
                        this.finishRound("defeat");
                    }
                } else {
                    this.userTurn();
                }
                break;
            }
            case "no": {
                this.handleDealerTurns();
                break;
            }
            default: {
                console.log("Неизвестная команда! Попробуйте еще раз!");
                this.userTurn();
            }
        }
    }

    handleDealerTurns() {
        const userValue = this.currentRound.user.value;

        while (this.currentRound.dealer.value < 17) {
            console.log("Дилер берет карту...");
            this.getCard("dealer");
            console.log(this.currentRound.toString());
        }

        const dealerValue = this.currentRound.dealer.value;

        if (userValue == dealerValue) {
            this.finishRound("draw");
        } else if (dealerValue > userValue && dealerValue <= 21) {
            this.finishRound("defeat");
        } else {
            this.finishRound("victory");
        }
    }

    getCard(player) {
        while (true) {
            const randomCardNumber = Math.floor(Math.random() * 52);
            let card = this.cards[randomCardNumber];

            if (!card.isChosen) {
                this.currentRound[player].cards.push(card);
                card.isChosen = true;
                if (
                    card.name == "A" &&
                    this.currentRound[player].isAceInCards
                ) {
                    this.currentRound[player].value += 1;
                } else {
                    this.currentRound[player].isAceInCards = true;
                    this.currentRound[player].value += card.value;
                }
                break;
            }
        }
    }

    finishRound(message) {
        switch (message) {
            case "victory": {
                console.log("Поздравляем! Вы победили!");
                break;
            }
            case "defeat": {
                console.log("К сожалению, вы проиграли!");
                break;
            }
            case "draw": {
                console.log("Ничья!");
            }
        }
        this.writeStats(message);
        this.typeToContinue();
    }
}

// Создаем экземпляр класса Blackjack и запускаем игру

const game = new Blackjack();
game.mainMenu();
