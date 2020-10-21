var tress = require('tress');
var needle = require('needle');
var cheerio = require('cheerio');
var resolve = require('url').resolve;
var fs = require('fs');

var URL = 'https://rossaprimavera.ru/feed/news/';
var results = [];

var q = tress(function(url, callback){
    needle.get(url, function(err, res){
        if (err) throw err;

        var $ = cheerio.load(res.body);

        if($('.text')){
            results.push({
                title: $('h1').text(),
                date: $('.b_infopost>.date').text(),
                href: url,
                size: $('.newsbody').text().length
            });
        }

        $('.b_rewiev p>a').each(function() {
            q.push($(this).attr('href'));
        });

        $('.bpr_next>a').each(function() {
            q.push(resolve(URL, $(this).attr('href')));
        });

        callback();
    });
}, 10);

q.drain = function(){
    console.log(JSON.stringify(results, null, 4))
    fs.writeFileSync('./data.json', JSON.stringify(results, null, 4));
}

q.push(URL);