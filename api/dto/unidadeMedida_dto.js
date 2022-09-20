class UnidadeMedidaDTO {
    static toMap(unidadeMedidas) {
        unidadeMedidas.map(unidadeMedida => {
            return {
                descricao: unidadeMedida.descricao,
                sigla: unidadeMedida.sigla,
                quantidade: unidadeMedida.quantidade,
                _id: unidadeMedida._id,
            }
        })
    };
}

module.exports = UnidadeMedidaDTO