const request = require("request");
const cheerio = require("cheerio");

request("https://lenta.ru/", (err, response, body) => {
    if (!err && response.statusCode === 200) {
        const $ = cheerio.load(body);
        const mainNewsContainer = $(".b-yellow-box__wrap").children(".item");
        const len = mainNewsContainer.length;

        console.log("Главные новости с сайта Lenta.ru на текущий момент:");
        for (let i = 0; i < len; i++) {
            console.log(`${i + 1}.) ${mainNewsContainer.eq(i).text()}`);
        }
    }
});
