var fs = require('fs');

fs.unlink('log.txt', function (err) {
    if (err) {
        console.log('Ещё не сыграно ни одной игры');
    } else {
        console.log('Файл успешно очищен');
    }
});