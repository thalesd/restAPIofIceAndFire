const axios = require('axios');
const { validationResult } = require('express-validator');
const Casa = require('../models/casa');
const Lord = require('../models/lord');

const checkValidationError = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Dados invalidos: ");

        error.message += errors.array().map(e => e.msg).join(' | ');

        error.statusCode = 422;

        throw error;
    }
}

const handleError = (err, next) => {
    if (!err.statusCode) {
        err.statusCode = 500;
    }

    next(err);
}

exports.listCasas = (req, res, next) => {
    Casa.find()
        .populate('atualLord')
        .then(casas => {
            res.status(200)
                .json(casas);
        })
        .catch(err => handleError(err, next));
}

exports.addCasa = (req, res, next) => {
    checkValidationError(req);

    const { nome, regiao, anoDeFundacao, atualLordCharacterUrl } = req.body;

    let atualLord = null;

    Lord
        .findOne({ url: atualLordCharacterUrl })
        .then(async lord => {
            if (!lord) {
                await axios
                    .get(atualLordCharacterUrl)
                    .then(response => {
                        atualLord = new Lord({
                            url: response.data.url,
                            nome: response.data.name,
                            temporadas: response.data.tvSeries.map(s => s.replace("Season", "Temporada"))
                        });

                        return atualLord.save();
                    });
            }
            else {
                atualLord = lord;
            }
        })
        .then(() => {
            const casa = new Casa({
                nome,
                regiao,
                anoDeFundacao,
                atualLord: atualLord
            });

            return casa.save();
        })
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
    checkValidationError(req);

    const CasaNome = req.query.nome;

    Casa.findOne({ nome: CasaNome.trim() })
        .populate('atualLord')
        .then(casa => {
            if (!casa) {
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
    checkValidationError(req);

    const CasaID = req.params.casaID;

    Casa.findById(CasaID)
        .populate('atualLord')
        .then(casa => {
            if (!casa) {
                const error = new Error("Casa não encontrada.");
                error.statusCode = 404;

                throw error;
            }

            res.status(200)
                .json(casa);
        })
        .catch(err => handleError(err, next));
}

exports.updateCasa = (req, res, next) => {
    checkValidationError(req);

    const casaID = req.params.casaID;

    const { nome, regiao, anoDeFundacao, atualLordCharacterUrl } = req.body;

    Casa.findByIdAndUpdate(casaID)
        .then(casa => {
            if (!casa) {
                const error = new Error("Casa não encontrada.");
                error.statusCode = 404;

                throw error;
            }

            casa.nome = nome || casa.nome;
            casa.regiao = regiao || casa.regiao;
            casa.anoDeFundacao = anoDeFundacao || casa.anoDeFundacao;
            casa.atualLordCharacterUrl = atualLordCharacterUrl || casa.atualLordCharacterUrl;

            casa.save();

            res.status(200).json(casa);
        })
        .catch(err => handleError(err, next));
}

exports.deleteCasaByID = (req, res, next) => {
    checkValidationError(req);

    const CasaID = req.body.casaID;

    Casa.findOneAndDelete(CasaID)
        .then(result => {
            if (!casa) {
                const error = new Error("Casa não encontrada.");
                error.statusCode = 404;

                throw error;
            }

            res.status(200)
                .json(result);
        })
        .catch(err => handleError(err, next));
}