const express = require('express');
const { body, param, query } = require('express-validator');

const casaController = require('../controllers/casa');

const router = express.Router();

const casaValidation = [
    body('nome')
        .trim()
        .isLength({ min: 3, max: 255 })
        .withMessage("Nome deve ter ao menos 3 caracteres e no máximo 255"),
    body('regiao')
        .trim()
        .isLength({ min: 3, max: 255 })
        .withMessage("Região deve ter ao menos 3 caracteres e no máximo 255"),
    body('anoDeFundacao')
        .trim()
        .isDate()
        .withMessage("Ano de Fundação deve ser uma data válida"),
    body('atualLordCharacterUrl')
        .trim()
        .isURL()
        .withMessage("Por favor, insira um link de personagem da API [anapioficeandfire.com]. Ex: https://anapioficeandfire.com/api/characters/333")
        .custom(value => {
            return value.startsWith('https://anapioficeandfire.com/api/characters/');
        })
        .withMessage("Por favor, insira um link de personagem da API [anapioficeandfire.com]. Ex: https://anapioficeandfire.com/api/characters/333")
];

const casaIDParamValidation = [
    param('casaID')
        .trim()
        .isAlphanumeric()
        .withMessage("Parametro de rota deve ter conteúdo alfanumérico")
]

const casaNameValidation = [
    query('nome')
        .exists()
        .withMessage("Parametro nome deve ser provido")
        .trim()
    ]

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