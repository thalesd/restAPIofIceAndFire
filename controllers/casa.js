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
    const { nome, regiao, anoDeFundacao, atualLordID } = req.body;

    res.status(200)
        .json({ nome, regiao, anoDeFundacao, atualLordID });
}

exports.findCasaByName = (req, res, next) => { }

exports.findCasaByID = (req, res, next) => { }

exports.deleteCasaByID = (req, res, next) => { }