var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var utf8    = require('utf8');

const opt = {
  "url": 'http://www.resultadoonline.com/MasterAtletaPreparaResultadoOk.asp',
  "form": {
    "txtAno": "2015",
    "txtCodigoAtleta": "11612",
    "txtOrdem": "1",
    "pesq": "Pesquisar"
  }
}

request.post(opt, (err, response, body) => {
  if (err) {
    return console.error('upload failed:', err);
  }
  //console.log('Upload successful!  Server responded with:', body);
  const $ = cheerio.load(body);
  let counter = 0;
  
  $('table[border=1]')
  
});