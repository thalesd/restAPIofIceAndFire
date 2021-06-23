const express = require('express');
const { body } = require('express-validator');

const casaController = require('../controllers/casa');

const router = express.Router();

router.get('/casas', casaController.listCasas);

router.get('/casa', casaController.findCasaByID);

router.get('/casa', casaController.findCasaByName);

router.post('/casa',
    [
        body('nome')
            .trim()
            .isLength({ min: 5, max: 255 }),
        body('regiao')
            .trim()
            .isLength({ min: 5, max: 255 }),
    ],
    casaController.addCasa);

module.exports = router;