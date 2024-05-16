const Contrato = require('../models/contrato');

// GET /contratos
exports.getAllContratos = async (req, res) => {
  try {
    const contratos = await Contrato.find();
    res.json(contratos);
  } catch (err) {
    res.status(500).send(err);
  }
};

// GET /contratos/:id
exports.getContratoById = async (req, res) => {
  try {
    const contrato = await Contrato.findOne({ idcontrato: req.params.id });
    if (!contrato) return res.status(404).send('Contrato not found');
    res.json(contrato);
  } catch (err) {
    res.status(500).send(err);
  }
};

// GET /contratos?entidade=EEEE
exports.getContratosByEntidade = async (req, res) => {
  try {
    const contratos = await Contrato.find({ entidade_comunicante: req.query.entidade });
    res.json(contratos);
  } catch (err) {
    res.status(500).send(err);
  }
};

// GET /contratos?tipo=AAA
exports.getContratosByTipo = async (req, res) => {
  try {
    const contratos = await Contrato.find({ tipoprocedimento: req.query.tipo });
    res.json(contratos);
  } catch (err) {
    res.status(500).send(err);
  }
};

// GET /contratos/entidades
exports.getEntidades = async (req, res) => {
  try {
    const entidades = await Contrato.distinct('entidade_comunicante').sort();
    res.json(entidades);
  } catch (err) {
    res.status(500).send(err);
  }
};

// GET /contratos/tipos
exports.getTipos = async (req, res) => {
  try {
    const tipos = await Contrato.distinct('tipoprocedimento').sort();
    res.json(tipos);
  } catch (err) {
    res.status(500).send(err);
  }
};

// POST /contratos
exports.createContrato = async (req, res) => {
  try {
    const contrato = new Contrato(req.body);
    await contrato.save();
    res.status(201).json(contrato);
  } catch (err) {
    res.status(500).send(err);
  }
};

// DELETE /contratos/:id
exports.deleteContrato = async (req, res) => {
  try {
    const result = await Contrato.deleteOne({ idcontrato: req.params.id });
    if (result.deletedCount === 0) return res.status(404).send('Contrato not found');
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
};

// PUT /contratos/:id
exports.updateContrato = async (req, res) => {
  try {
    const contrato = await Contrato.findOneAndUpdate(
      { idcontrato: req.params.id },
      req.body,
      { new: true }
    );
    if (!contrato) return res.status(404).send('Contrato not found');
    res.json(contrato);
  } catch (err) {
    res.status(500).send(err);
  }
};
