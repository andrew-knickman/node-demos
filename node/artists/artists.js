//Andrew Knickman
//COSC 484 - Assignment 7

var request = require('request');
var cheerio = require('cheerio');

request('https://www.billboard.com/charts/rap-song', function(err, res, html)
{
    if(!error && Response.statusCode==200)
    {
        var buf = cheerio.load(html); //load the buffer that will act as selector for html elements
        buf('div.chart-list.chart-details__left-rail.title'.each(function(i, element)
        {
            console.log(buf(this).text());
        }));
    }
});