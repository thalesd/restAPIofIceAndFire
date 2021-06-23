const express = require('express');

const casaController = require('../controllers/casa');

const router = express.Router();

router.get('/casas', casaController.listCasas);

router.get('/casa', casaController.findCasaByID);

router.get('/casa', casaController.findCasaByName);

router.post('/casa', casaController.addCasa);

module.exports = router;