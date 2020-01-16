//Andrew Knickman
//COSC 484 - Assignment 7

var request = require('request');
var cheerio = require('cheerio');
var process = require('process');
var nodemailer = require('nodemailer');
var artists = []; //artists passed thru command line
var matches = []; //artists matched with songs found when searching for artists on page
var send; //boolean to send or not send

request('https://www.billboard.com/charts/rap-song', function(err, res, html)
{
    //test to see if it gets html from page
    //console.log(html);
    console.log('Requested HTML page');
    if(!err && res.statusCode==200)
    {
        console.log('No error with request. Status code 200 returned.');
        
        //load the buffer that will act as selector for html elements
        var buf = cheerio.load(html);
        
        if(buf != null) console.log('Cheerio loaded selector for HTML page.');

        if(process.argv[2] != null)
        {
            //single artist
            //artists = process.argv[2].toString();
            //multiple artists
            var i;
            for(i = 2; i < process.argv.length; i++)
            {
                artists[i-2] = process.argv[i].toString();
            }
            send = true;
            console.log('ARTIST(S) SPECIFIED\tEMAIL WILL BE SENT\nSearching for listings with artists: ' + artists.toString());
        }
        else
        {
            console.log('NO ARTIST SPECIFIED\tEMAIL WILL NOT BE SENT\nListing top artists on page:\n');
            send = false;
        }

        if(artists[0] != null)
        {
            buf('div.chart-list-item__artist').each(function(i, element)
            {
                var a;
                for(a = 0; a < artists.length; a++)
                {
                    var artstring = buf(this).text().trim();
                    //searches for artists that match specified artist
                    //and for artists featured with another artist
                    if(artstring.localeCompare(artists[a]) == 0 || artstring.includes(artists[a]))
                    {
                        console.log('\nMATCH');
                        console.log((i + 1) + " Artist: " + buf(this).text().trim())
                        console.log('Song: ' + buf(this).siblings('.chart-list-item__title').text().trim());
                        var match = "Artist: " + artstring.toString() + "\tSong: " + buf(this).siblings('.chart-list-item__title').text().trim().toString();
                        matches.push(match);
                    }
                }
            });
            console.log("\nHere are your artists matched with their songs");
            var l;
            for(l = 0; l < matches.length; l++)
            {
                console.log(matches[l]);
            }
        }
        else
        {
            buf('div.chart-list-item__artist').each(function(i, element)
            {
                console.log((i + 1) + " Artist: " + buf(this).text().trim());
                console.log('Song: ' + buf(this).siblings('.chart-list-item__title').text().trim() + "\n");
            });
        }
    }
    if(send != false)
    {
        console.log('\nSending artists data...');
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'aktestmailer@gmail.com',
                pass: 'xxxxx'
            }
        });
        let mailOptions = {
            from: '"Andrew Knickman" <aktestmailer@gmail.com>',
            to: 'knickman484a7@gmail.com',
            subject: 'Your artists(s) are:',
            text: matches,
            html: '<i>' + matches + '</i>'
        };
        transporter.sendMail(matches);
        console.log('Artist data sent!');
    }
});