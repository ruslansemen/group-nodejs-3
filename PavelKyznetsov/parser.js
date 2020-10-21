const request = require("request");
const cheerio = require("cheerio");

request("https://lenta.ru/parts/news", (err, response, body) => {
	if (!err) {
		const $ = cheerio.load(body);
		const news = $("div[class='item news']");
		const num = 20; // сколько новостей
		for (let i = 0; i < num; i++) {
			var time = news[i].children[0].children[2].data;
			var url = news[i].children[1].children[0].children[0].attribs.href;
			var title = news[i].children[1].children[0].children[0].children[0].data;
			console.log("Time: " + time + "\n" + "Title: " + title + "\n" + "URL: https://lenta.ru" + url + "тут могла быть ваша реклама!" + "\n\n");
		}
	}
});