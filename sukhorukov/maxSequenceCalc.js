maxSequence = (arr, win) => {
    let sequence = []
    let count = 0

    if (win) {
        for (let item of arr) {
            if (item.win) {
                count++
            } else {
                sequence.push(count)
                count = 0
            } 
        } 
    } else {
        for (let item of arr) {
            if (!item.win) {
                count++
            } else {
                sequence.push(count)
                count = 0
            } 
        } 
    }

    return Math.max(...sequence)
}

module.exports = maxSequence