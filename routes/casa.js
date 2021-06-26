const express = require('express');

const casaController = require('../controllers/casa');

const router = express.Router();

const { casaValidation, casaIDParamValidation, casaNameValidation } = require('../validations/casaValidation');

router.get('/casas', casaController.listCasas);

router.get('/casa/:casaID', casaIDParamValidation, casaController.findCasaByID);

router.get('/casa', casaNameValidation, casaController.findCasaByName);

router.post('/casa',
    casaValidation,
    casaController.addCasa);

router.put('/casa/:casaID',
    [...casaIDParamValidation, ...casaValidation],
    casaController.updateCasa);

router.delete('/casa/:casaID', casaIDParamValidation, casaController.deleteCasaByID);

module.exports = router;