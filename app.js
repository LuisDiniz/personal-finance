'use strict';

// Imports
const interImport = require('./import/Inter');
const LancamentoRepository = require('./repository/lancamentoRepository');
const sql = require('./util/db');
// Constantes
const consultarConta = `SELECT * FROM Conta`;
const filePath = '/Users/Luis/Downloads/inter-extrato.csv'

async function main() {

    let result = {};

    const lancamentoRepository = new LancamentoRepository();

    // Teste de conexão com o banco de dados
    console.log(`\nContas:\n`);
    result = await sql.query(consultarConta);
    for (let record of result.recordset) {
        console.log(record);            
    }
    console.log(`\nLançamentos:\n`);
    result = await lancamentoRepository.findAll();
    for (let record of result.recordset)
        console.log(record);            

    // Teste importar extrato banco Inter
    let retorno = await interImport.importFileLancamento(filePath);
    // Remover da lista lancamentos que já existem no banco    
    for (let lancamento of retorno.lancamentos)
        if (lancamentoRepository.findLancamentoDuplicado(lancamento.descricao.replace(/[']/g, ''), lancamento.valor, lancamento.data))
            retorno.lancamentos.pop(lancamento);
    // Persiste as informações
    // contaRepository.atualizarSaldo(contaId, retorno.saldo);
    // Insere os novos lancamentos no banco
    for (let lancamento of retorno.lancamentos){
        let descricaoOriginal = lancamento.descricao.replace(/[']/g, '');
        let valor = lancamento.valor;
        let data = lancamento.data;        
        lancamentoRepository.save(descricaoOriginal, valor, data);
    }
       
    // console.log(`\nLançamento:\n`);
    // result = await sql.query(consultarLancamentos);
    // for (let record of result.recordset) {
    //     console.log(record);            
    // }
}

main();