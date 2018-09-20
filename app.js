'use strict';

// Imports
const interImport = require('./import/Inter');
const formatUtil = require('./util/formatUtil');
const LancamentoRepository = require('./repository/lancamentoRepository');
const ContaRepository = require('./repository/contaRepository');
const sql = require('./util/db');
// Constantes
const consultarConta = `SELECT * FROM Conta`;
const filePath = '/Users/Luis/Downloads/inter-extrato.csv'

async function main() {

    let result = {};

    const lancamentoRepository = new LancamentoRepository();
    const contaRepository = new ContaRepository();

    // Teste de conexão com o banco de dados
    console.log(`\nContas:\n`);
    result = await contaRepository.findAll();
    for (let record of result.recordset) {
        console.log(record);            
    }

    // console.log(`\nLançamentos:\n`);
    // result = await lancamentoRepository.findAll();
    // for (let record of result.recordset)
    //     console.log(record);            

    // Teste importar extrato banco Inter
    let retorno = await interImport.importFileLancamento(filePath);
    // Prepara a lista lancamentos que não existem no banco para serem inseridos    
    let lancamentos = [];
    for (let lancamento of retorno.lancamentos){
        let encontrou = await lancamentoRepository.findLancamentoDuplicado(lancamento.descricao.replace(/[']/g, ''), lancamento.valor, lancamento.data);
        if (!encontrou)
            lancamentos.push(lancamento);
    }
    // Persiste as informações
    let contaId = 2; // Itau
    await contaRepository.atualizarSaldo(contaId, formatUtil.formatReal(retorno.saldo));
    // Insere os novos lancamentos no banco
    for (let lancamento of lancamentos){
        let descricaoOriginal = lancamento.descricao.replace(/[']/g, '');
        let valor = lancamento.valor;
        let data = lancamento.data;        
        await lancamentoRepository.save(contaId, descricaoOriginal, valor, data);
    }
       
    console.log(`Fim da execução`);
}

main();