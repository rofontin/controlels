const mongoose = require('mongoose');

const unidadeMedidaSchema = new mongoose.Schema({
    descricao: {type: String, required: true},
    sigla: {type: String, required: true},
    quantidade: {type: String, required: true},
},
{
    timestamps: true
});

mongoose.model('UnidadeMedida', unidadeMedidaSchema);