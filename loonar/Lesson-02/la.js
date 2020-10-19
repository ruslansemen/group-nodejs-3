const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'log'), 'utf8', (err, data) => {
    if(err){
        throw err
    }

    //console.log(data)
    //делаем массив ответов
    let logData = data.split('\n').slice(0, -1)
    let winsCount = logData.filter(e => e === 'Win').length
    let losesCount = logData.filter(e => e === 'Loss').length
    let ratio = Math.floor(winsCount/losesCount * 100) / 100
    let winsLength = 0
    let maxWinsSerie = 0
    let losesLength = 0
    let maxLosesSerie = 0

    for (let i = 0; i < logData.length; i++) {
        if (logData[i] === 'Win')
        {
            winsLength++;
        } else {
            if (maxWinsSerie < winsLength)
            {
                maxWinsSerie = winsLength
            }
            winsLength = 0
        }
        if (i === logData.length - 1 && maxWinsSerie < winsLength) {
            maxWinsSerie = winsLength;
        }

        if (logData[i] === 'Loss')
        {
            losesLength++;
        } else
        {
            if (maxLosesSerie < losesLength)
            {
                maxLosesSerie = losesLength;
            }
            losesLength = 0;
        }
        if (i === logData.length - 1 && maxLosesSerie < losesLength)
        {
            maxLosesLength = losesLength;
        }
    }

    let stats = `Всего раундов ${logData.length}\n`
    stats += `Побед ${winsCount}\n`
    stats += `Поражений ${losesCount}\n`
    stats += `Соотношение побед и поражений ${ratio}\n`
    stats += `Максимальная серия побед ${maxWinsSerie}\n`;
    stats += `Максимальная серия поражений ${maxLosesSerie}\n\n`;

    return console.log(stats);
})
