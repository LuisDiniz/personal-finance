'use strict';

const LancamentoRepository = require('../repository/lancamentoRepository');
const LancamentoHistoricoCategoriaRepository = require('../repository/lancamentoHistoricoCategoriaRepository');

module.exports = class LancamentoController {

    constructor(){
        this.lancamentoRepository = new LancamentoRepository();
        this.lancamentoCategoriaRepository = new LancamentoHistoricoCategoriaRepository();
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
        // Recupera a lista de categoria de lancamentos salvos
        let listaLancametoCategoria = await this.lancamentoCategoriaRepository.findAll();
        // Insere os novos lancamentos no banco
        for (let lancamento of novosLancamentos){
            if (lancamento.categoriaId === null){
                // Atualiza as informações dos lançamentos que casem com alguma descrição parcial salva                               
                for (let lancamentoCategoria of listaLancametoCategoria){
                    if (lancamento.descricaoOriginal.match(new RegExp(lancamentoCategoria.descricaoParcial, 'i'))){
                        lancamento.categoriaId = lancamentoCategoria.categoriaId;
                        lancamento.descricao = lancamentoCategoria.descricao;
                        break;
                    }
                }
            }
            await this.inserirLancamento(lancamento);
        }        
    }

}