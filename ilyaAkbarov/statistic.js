const fs = require('fs')

module.exports = Object.freeze({
  readStatistic: (filepath) => {
    const file = fs.readFileSync(filepath, 'utf8')
    return JSON.parse(file)
  },
  writeStatistic: (statistic ,filepath, isWin) => {
    statistic.gameCount++
  
    if (isWin) {
      statistic.win++
    } else {
      statistic.losses++
    }
  
    if (statistic.lastGameResult === null) {
      if (isWin) {
        statistic.winStrike++
        statistic.maxWinStrike++
      } else {
        statistic.looseStrike++
        statistic.maxLooseStrike++
      }
      statistic.lastGameResult = isWin
      
      const result = JSON.stringify(statistic, null, 4)
      fs.writeFileSync(filepath, result)
      return
    }
  
    if (statistic.lastGameResult && isWin) {
      statistic.winStrike++
      if (statistic.winStrike > statistic.maxWinStrike) {
        statistic.maxWinStrike = statistic.winStrike
      }
    }
  
    if (statistic.lastGameResult && !isWin) {
      statistic.winStrike = 0
    }
  
    if (!statistic.lastGameResult && isWin) {
      statistic.looseStrike = 0
    }
  
    if (!statistic.lastGameResult && !isWin) {
      statistic.looseStrike++
      if (statistic.looseStrike > statistic.maxLooseStrike) {
        statistic.maxLooseStrike = statistic.looseStrike
      }
    }
  
    statistic.lastGameResult = isWin
  
    const result = JSON.stringify(statistic, null, 4)
    fs.writeFileSync(filepath, result)
  }
})
