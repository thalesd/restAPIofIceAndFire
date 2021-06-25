const express = require('express');
const { body } = require('express-validator');

const casaController = require('../controllers/casa');

const router = express.Router();

const casaValidation = [
    body('nome')
        .trim()
        .isLength({ min: 5, max: 255 }),
    body('regiao')
        .trim()
        .isLength({ min: 5, max: 255 }) 
];

router.get('/casas', casaController.listCasas);

router.get('/casa/:casaID', casaController.findCasaByID);

router.get('/casa', casaController.findCasaByName);

router.post('/casa',
    casaValidation,
    casaController.addCasa);

router.put('/casa/:casaID',
    casaValidation,
    casaController.updateCasa);

router.delete('/casa/:casaID', casaController.deleteCasaByID);

module.exports = router;