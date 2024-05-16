const express = require('express');
const router = express.Router();
const contratoController = require('../controllers/contratoController');

// Definição das rotas
router.get('/', contratoController.getAllContratos);
router.get('/:id', contratoController.getContratoById);
router.get('/entidades', contratoController.getEntidades);
router.get('/tipos', contratoController.getTipos);
router.get('/search', contratoController.getContratosByEntidade);
router.get('/search', contratoController.getContratosByTipo);
router.post('/', contratoController.createContrato);
router.delete('/:id', contratoController.deleteContrato);
router.put('/:id', contratoController.updateContrato);

module.exports = router;
