'use strict';

// Imports
const fs = require('fs');
const formatUtil = require('../util/formatUtil');
const Lancamento = require('../model/lancamento');
// Expressão regular para encontrar o campo de data no arquivo
let regexpData = /data/i;
let regexpSaldo = /saldo/i;
// Variáveis para armazenar a ordem dos campos no arquivo
let indiceData = 0;
let indiceDescricao = 1;
let indiceValor = 2;
// Array com todos os lançamentos importados pelo arquivo
let lancamentos = [];
// Variáveis de controle usados durante a leitura do arquivo
let achouSaldo = false;
let achouCabecalho = false;
// Variáveis para armazenar os valores lidos do arquivo
let saldo = 0;

async function importFileLancamento(filePath, contaId) {

    // lê o arquivo
    let arquivo = fs.readFileSync(filePath);
    let linhas = arquivo.toString().split("\n");

    for (const linha of linhas) {
        let campos = linha.split(";");
        if (achouSaldo){
            if (campos.length > 1){ 
                if (achouCabecalho){   
                    let lancamento = new Lancamento();
                    lancamento.data = campos[indiceData];
                    lancamento.descricaoOriginal = campos[indiceDescricao];
                    lancamento.valor = formatUtil.formatReal(campos[indiceValor]);
                    lancamento.contaId = contaId;
                    lancamentos.push(lancamento);
                }
                else
                    if (regexpData.test(campos[0]))
                        achouCabecalho = true;
            }
        }
        else 
            if (regexpSaldo.test(campos[0])) {
                saldo = campos[1];
                achouSaldo = true;
            }
    }

    let retorno = {
        "saldo": saldo,
        "lancamentos": lancamentos
    }

    return retorno; 

}

module.exports.importFileLancamento = importFileLancamento;