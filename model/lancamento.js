'use strict'

module.exports = class Lancamento {

    constructor(){
        this.descricao = '';
        this.descricaoOriginal = '';
        this.valor = 0.00;
        this.data = null;
        this.categoriaId = null;
        this.contaId = null;
    }

}