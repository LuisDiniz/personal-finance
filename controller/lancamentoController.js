'use strict';

const LancamentoRepository = require('../repository/lancamentoRepository');

module.exports = class LancamentoController {

    constructor(){
        this.lancamentoRepository = new LancamentoRepository();
    }

    async inserirLancamento(lancamento){
        this.lancamentoRepository.save(lancamento);
    }

    async inserirLancamentos(lancamentos){
        // Prepara a lista lancamentos que não existem no banco para serem inseridos    
        let novosLancamentos = [];
        for (let lancamento of lancamentos) {
            let encontrou = await this.lancamentoRepository.findLancamentoDuplicado(lancamento);
            if (!encontrou)
                novosLancamentos.push(lancamento);
        }    
        // Insere os novos lancamentos no banco
        for (let lancamento of novosLancamentos){
            await this.inserirLancamento(lancamento);
        }        
    }

}