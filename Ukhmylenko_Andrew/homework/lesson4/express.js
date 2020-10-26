const express = require("express");
const hbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const path = require("path");
const request = require("request");
const cheerio = require("cheerio");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

app.engine(
    "hbs",
    hbs({
        extname: "hbs",
        defaultLayout: "default",
        layoutsDir: path.join(__dirname, "views", "layouts"),
        partialsDir: path.join(__dirname, "views", "partials"),
    })
);
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.render("index", {});
});

app.get("/lenta", (req, res) => {
    request("https://lenta.ru/", (err, response, body) => {
        if (!err && response.statusCode === 200) {
            const $ = cheerio.load(body);
            const mainNews = $(".b-yellow-box__wrap").children(".item");
            const len = mainNews.length;
            const mainNewsContainer = [];
            const mainNewsLinksContainer = [];
            for (let i = 0; i < len; i++) {
                let temp = mainNews.eq(i).html();

                mainNewsContainer[i] = {
                    text: mainNews.eq(i).text(),
                    link: temp.match(/\/[\w|\/]+/),
                };
            }
            for (let i = 0; i < len; i++) {}
            res.render("lenta", { mainNewsContainer, mainNewsLinksContainer });
        }
    });
});

app.post("/lenta", (req, res) => {
    request("https://lenta.ru/", (err, response, body) => {
        const { param1 } = req.body;

        if (!err && response.statusCode === 200) {
            const $ = cheerio.load(body);
            const mainNews = $(".b-yellow-box__wrap").children(".item");
            let len = mainNews.length;
            const amount = +param1;
            if (amount <= len && amount >= 0) {
                len = amount;
            }

            const mainNewsContainer = [];
            for (let i = 0; i < len; i++) {
                let temp = mainNews.eq(i).html();

                mainNewsContainer[i] = {
                    text: mainNews.eq(i).text(),
                    link: temp.match(/\/[\w|\/]+/),
                };
            }
            res.render("lenta", { mainNewsContainer, len });
        }
    });
});

app.get("/cookie/get", (req, res) => {
    console.log(req.cookies);
    res.send(JSON.stringify(req.cookies));
});

app.get("/cookie/set", (req, res) => {
    res.cookie("count", Math.floor(Math.random() * 10));
    res.redirect("/cookie/get");
});

app.get("*", (req, res) => {
    res.status(404).render("error");
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
