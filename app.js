'use strict';

// Imports
const interImport = require('./import/Inter');
const formatUtil = require('./util/formatUtil');
const LancamentoController = require('./controller/lancamentoController');
const ContaRepository = require('./repository/contaRepository');
// Constantes
const consultarConta = `SELECT * FROM Conta`;
const filePath = '/Users/Luis/Downloads/inter-extrato.csv'

async function main() {

    let result = {};

    const lancamentoController = new LancamentoController();
    const contaRepository = new ContaRepository();
    const CONTA_ID_ITAU = 2;
    const CONTA_ID_INTER = 3;

    // Teste importar extrato banco Inter
    let retorno = await interImport.importFileLancamento(filePath, CONTA_ID_INTER);    
    await lancamentoController.inserirLancamentos(retorno.lancamentos);
    // Persiste as informações
    await contaRepository.atualizarSaldo(CONTA_ID_INTER, formatUtil.formatReal(retorno.saldo));
       
    console.log(`Fim da execução`);
}

main();