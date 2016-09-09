const mongoose = require('mongoose');
const atletas = require('./output.json');
const async = require('async');
const moment = require('moment');

mongoose.connect('mongodb://localhost/elodb', function (error) {
  if (error) {
    console.log(error);
  }
});

const Schema = mongoose.Schema;
const AtletaSchema = new Schema({
  codigo: Number,
  nome: String,
  dataNasc: Date,
  sexo: String,
  categoria: String
});

const AtletaModel = mongoose.model('atleta', AtletaSchema);

async.each(Object.keys(atletas), function (index, next) {
  let { '0': codigo, '1': nome, '2': dataNasc, '3': sexo, '4': categoria } = atletas[index];
  dataNasc = moment("dataNasc", "DD/MM/YYYY").toDate();
  const Atleta = new AtletaModel({codigo, nome, dataNasc, sexo, categoria});
  
  console.log(`Salvando ${nome} - ${codigo} ${dataNasc} ${sexo} ${categoria}`);
  Atleta.save(function (error, savedAtleta) {
    if (error) {
      console.log(`Erro ao salvar Atleta ${Atleta.nome}: ${error}`);
      return next();
    }
    //console.log(`Sucesso ao salvar Atleta ${Atleta.nome}`);
    next();
  });
}, function () {
  console.log(`fim`);
});

/*
AtletaModel.find({
  codigo: 18665
}, (err, result) => {
  console.log(result);
})
*/