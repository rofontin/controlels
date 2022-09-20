const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ProdutoDTO} = require('../dto/produtoDTO');

const ProdutoModel = mongoose.model('Produto');
const controllerUser = require('../controllers/user-controller');

//Paginar consulta
router.get('/', controllerUser.verifyJWT, async (req, res, next) => {
    try {
        const produtos = await ProdutoModel.find().populate('unidadeMedida');
        res.status(200).json({
            count: produtos.length,
            produtos: ProdutoDTO.toMap(produtos)
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', controllerUser.verifyJWT, async (req, res, next) => {
    console.log(req.file);
    try {
        const product = new ProdutoModel({
            nome: req.body.name,
            preco: req.body.price,
            unidadeMedida: req.body.unidadeMedida
        });
        await product.save();
        res.status(201).json({
            message: 'Produto criado com sucesso!',
            createdProduct: {
                name: product.name,
                price: product.price,
                _id: product._id,
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:productId', controllerUser.verifyJWT, async (req, res, next) => {
    const id = req.params.productId;

    try {
        const product = await ProdutoModel.findOne({ _id: id });
        if (product) {
            res.status(200).json({
                product: product,
            });
        } else {
            res.status(404).json("Produto não existe!");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.patch('/:productId', controllerUser.verifyJWT, async (req, res, next) => {
    const id = req.params.productId;
    const updateCampos = {};
    Object.entries(req.body).map(item => {
        console.log(item);
        updateCampos[item[0]] = item[1];
    })
    try {
        let status = await ProductModel.updateOne({ _id: id },
            { $set: updateCampos });

        res.status(200).json({
            message: 'Update products',
            status: status,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

})


router.delete('/:productId', controllerUser.verifyJWT, async (req, res, next) => {
    const id = req.params.productId;

    try {
        let status = await ProductModel.deleteOne({ _id: id });

        res.status(200).json({
            message: 'Produto deletado',
            status: status
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;