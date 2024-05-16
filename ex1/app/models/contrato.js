const mongoose = require('mongoose');

const contratoSchema = new mongoose.Schema({
  idcontrato: String,
  nAnuncio: String,
  tipoprocedimento: String,
  objectoContrato: String,
  dataPublicacao: Date,
  dataCelebracaoContrato: Date,
  precoContratual: Number,
  prazoExecucao: Number,
  NIPC_entidade_comunicante: String,
  entidade_comunicante: String,
  fundamentacao: String
});

const Contrato = mongoose.model('Contrato', contratoSchema);

module.exports = Contrato;
