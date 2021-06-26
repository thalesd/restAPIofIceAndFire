const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lordSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    temporadas: [{
        type: String
    }]
},
    { timestamps: true }
);

module.exports = mongoose.model('Lord', lordSchema);