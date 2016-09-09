const mongoose = require('mongoose');
const provas = require('./provas.json');
const async = require('async');
const moment = require('moment');

mongoose.connect('mongodb://localhost/elodb', function (error) {
  if (error) {
    console.log(error);
  }
});

const Schema = mongoose.Schema;
const ProvaSchema = new Schema({
  nome: String,
  sexo: String
});

const ProvaModel = mongoose.model('prova', ProvaSchema);

async.each(Object.keys(provas), function (index, next) {
  let { nome, sexo } = provas[index];
  const Prova = new ProvaModel({ nome, sexo });
  
  console.log(`Salvando ${nome} - ${sexo}`);
  Prova.save(function (error, savedProva) {
    if (error) {
      console.log(`Erro ao salvar Prova ${Prova.nome}: ${error}`);
      return next();
    }
    //console.log(`Sucesso ao salvar Prova ${Prova.nome}`);
    next();
  });
}, function () {
  console.log(`fim`);
});

/*
ProvaModel.find({
  codigo: 18665
}, (err, result) => {
  console.log(result);
})
*/