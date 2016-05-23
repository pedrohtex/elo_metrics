var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var utf8    = require('utf8')
var app     = express();

app.get('/scrape', function(req, res){

//url = 'http://www.resultadoonline.com/masterAtletaMas.asp';
//url = 'http://www.resultadoonline.com/masterequipeatleta.asp?CodigoEquipe1=178';
  const opt = {
    uri: 'http://www.resultadoonline.com/masterequipeatleta.asp?CodigoEquipe1=178',
    encoding: 'utf8'
  }

request(opt, function(error, response, html){
    console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'))
      
    if(!error){
        var $ = cheerio.load(html);

        var title, release, rating;
        var json = {};
        var counter = 0;

        $('table[border=1] tr[bgcolor=white]').each(function (i, row) {
            const aux = {};
            var _row = $(row);
            _row.children('td').each(function (k, cell) {
                var _cell = $(cell);
                //aux[k] = utf8.encode(_cell.text().trim());
                aux[k] = JSON.parse( JSON.stringify(_cell.text().trim()) );
                //console.log(k, _cell.text());
            });
            json[i] = aux;
            counter++;
            //console.log(aux[1]);
        })
        
        console.log(`counter ${counter}`)

        $('h1[itemprop=name]').filter(function(){
            var data = $(this);
            title = data.text();            
            release = data.children().last().children().text();

            json.title = title;
            json.release = release;
        })

        $('span[itemprop=ratingValue]').filter(function(){
            var data = $(this);
            rating = data.text();

            json.rating = rating;
        })
    }

// To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

    fs.writeFile('output.json', JSON.stringify(json, null, 4), 'utf8', function(err){

        console.log('File successfully written! - Check your project directory for the output.json file');

    })

    // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
    res.send('Check your console!')

}) ;
})

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;