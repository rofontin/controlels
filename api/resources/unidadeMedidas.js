const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const UnidadeMedidaModel = mongoose.model('UnidadeMedida');
const controllerUser = require('../controllers/user-controller');
const {UnidadeMedidaDTO} = require('../dto/unidadeMedida_dto');

//Paginar consulta
router.get('/', controllerUser.verifyJWT, async (req, res, next) => {
    try {
        const unidadeMedidas = await UnidadeMedidaModel.find();
        res.status(200).json({
            count: unidadeMedidas.length,
            unidadeMedidas: UnidadeMedidaDTO.toMap(unidadeMedidas)
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', controllerUser.verifyJWT, async (req, res, next) => {
    try {
        let unidadeMedida = new UnidadeMedidaModel ({
            descricao: req.body.descricao,
            sigla: req.body.sigla,
            quantidade: req.body.quantidade
        });
        unidadeMedida = await unidadeMedida.save();

        res.status(201).json({
            message: 'Unidade de medida criada com sucesso!',
            createdUnidadeMedida: {
                id: unidadeMedida._id,               
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.get('/:unidadeMedidaId', controllerUser.verifyJWT, async (req, res, next) => {
    const id = req.params.unidadeMedidaId;
    try {
        const unidadeMedida = await UnidadeMedidaModel.findOne({_id: id})
        .populate('product');
        if (unidadeMedida) {
            res.status(200).json({
                unidadeMedida: unidadeMedida
            })
        } else {
            res.status(404).json("Unidade de medida não existe!");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.delete('/:unidadeMedidaId', controllerUser.verifyJWT, async (req, res, next) => {
    const id = req.params.unidadeMedidaId;
    try {
        const status = await UnidadeMedidaModel.deleteOne({_id: id});
        res.status(200).json({
            message: 'Delete unidade de medida',
            status: status
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;