const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const casaSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    regiao: {
        type: String,
        required: true
    },
    anoDeFundacao: {
        type: Date,
        required: true
    },
    atualLord: {
        type: Schema.Types.ObjectId,
        ref: 'Lord',
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Casa', casaSchema);