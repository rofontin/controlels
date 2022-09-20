class ProdutoDTO {

    constructor() {}

    static toMap(produtos) {
        produtos.map(produto => {
            return {
                nome: produto.nome,
                preco: produto.preco,
                unidadeMedida: produto.unidadeMedida,
                _id: produto._id,
            }
        })
    };
}

module.exports = ProdutoDTO