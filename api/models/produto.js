const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    descricao: { type: String, required: true },
    preco: { type: Number, required: true },
    unidadeMedida: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UnidadeMedida'
    },
},
    {
        timestamps: true
    });

mongoose.model('Produto', produtoSchema);