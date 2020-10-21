const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('https://rossaprimavera.ru/feed/news/');

    const result = await page.evaluate(() => {
        let data = [];
        let elements = document.querySelectorAll('.text'); // Выбираем все новости
        console.log(elements)
        for (var element of elements){
            let topic = element.childNodes[1].innerText;
            let title = element.childNodes[3].innerText;
            let time = element.childNodes[5].innerText;
            data.push({topic, title, time});
        }

        return data;
    });

    browser.close();
    return result;
};

scrape().then((value) => {
    console.log(value);
});