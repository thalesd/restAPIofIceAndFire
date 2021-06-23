const { validationResult } = require('express-validator');
const Casa = require('../models/casa');

const handleError = (err, next) => {
    if(!err.statusCode){
        err.statusCode = 500;
    }

    next(err);
}

exports.listCasas = (req, res, next) => {
    Casa.find()
        .then(result => {
            res.status(200)
                .json(result);
        })
        .catch(err => handleError(err, next));

}

exports.addCasa = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errror = new Error("Dados invalidos");
        error.statusCode = 422;

        throw error;
    }

    const { nome, regiao, anoDeFundacao, atualLordCharacterUrl } = req.body;

    const casa = new Casa({
        nome, 
        regiao, 
        anoDeFundacao, 
        atualLordCharacterUrl
    });

    casa.save()
        .then(result => {
            res.status(201)
                .json({
                    message: "Casa criada com sucesso.",
                    result
                });
        })
        .catch(err => handleError(err, next));
}

exports.findCasaByName = (req, res, next) => { 
    const CasaNome = req.query.nome;

    Casa.find({ nome: CasaNome.tim() })
        .then(casa => {
            if(!casa){
                const error = new Error("Casa não encontrada.");
                error.statusCode = 404;

                throw error;
            }

            res.status(200)
                .json(casa);
        })
        .catch(err => handleError(err, next));
}

exports.findCasaByID = (req, res, next) => { 
    const CasaID = req.params.casaID;

    Casa.findById(CasaID)
        .then(casa => {
            if(!casa){
                const error = new Error("Casa não encontrada.");
                error.statusCode = 404;

                throw error;
            }

            res.status(200)
                .json(casa);
        })
        .catch(err => handleError(err, next));
}

exports.deleteCasaByID = (req, res, next) => { 
    const CasaID = req.body.casaID;

    Casa.findOneAndDelete(CasaID)
        .then(result => {
            res.status(200)
                .json(result);
        })
        .catch(err => handleError(err, next));
}