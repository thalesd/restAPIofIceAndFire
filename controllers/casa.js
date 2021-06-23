const { validationResult } = require('express-validator');
const Casa = require('../models/casa');

exports.listCasas = (req, res, next) => {
    res.status(200)
        .json(
            [
                {
                    Nome: "",
                    Regiao: "",
                    AnoDeFundacao: "",
                    AtualLord: {
                        Nome: "",
                        Temporadas: [1, 2, 3, 4, 5, 6]
                    },
                }
            ]
        );
}

exports.addCasa = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json("Dados invalidos.")
    }

    const { nome, regiao, anoDeFundacao, atualLordCharacterLink } = req.body;

    const casa = new Casa({
        nome, 
        regiao, 
        anoDeFundacao, 
        atualLordCharacterLink
    });

    casa.save()
        .then(result => {
            res.status(201)
                .json({
                    message: "Casa criada com sucesso.",
                    result
                });
        })
        .catch(err => console.log(err));
}

exports.findCasaByName = (req, res, next) => { }

exports.findCasaByID = (req, res, next) => { }

exports.deleteCasaByID = (req, res, next) => { }