'use strict';

// Imports
const interImport = require('./import/Inter');
const sql = require('./util/db');
// Constantes
const consultarConta = `SELECT * FROM Conta`;
const consultarLancamentos = `SELECT * FROM Lancamento`;
const filePath = '/Users/Luis/Downloads/inter-extrato.csv'

async function main() {

    // Teste de conexão com o banco de dados
    console.log(`\nContas:\n`);
    let result = await sql.query(consultarConta);
    for (let record of result.recordset) {
        console.log(record);            
    }
    console.log(`\nLançamento:\n`);
    result = await sql.query(consultarLancamentos);
    for (let record of result.recordset) {
        console.log(record);            
    }

    // Teste importar extrato banco Inter
    let retorno = await interImport.importFileLancamento(filePath);
    for (let lancamento of retorno.lancamentos){
        await sql.query(`INSERT INTO Lancamento (
                            DescricaoOriginal,
                            Valor,
                            Data
                          )
                          VALUES (
                            ${lancamento.descricao},
                            ${lancamento.valor},
                            ${lancamento.data},
                          )`)
    } 
       
    // console.log(`\nLançamento:\n`);
    // result = await sql.query(consultarLancamentos);
    // for (let record of result.recordset) {
    //     console.log(record);            
    // }
}

main();