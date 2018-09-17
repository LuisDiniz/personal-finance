'use strict';

/**
 * Remove máscara da moeda "Real" e formata para inserir no banco de dados. 
 * @param {*} string Valor com máscara da moeda "Real" 
 */
exports.formatReal = (string) => {

    // Remove máscara do Real
    string = string.replace(/(R\$)/,'');
    // Remove espaços em brancho
    string = string.replace(/\s/g,'');
    // Troca ',' por '.'
    string = string.replace(/[,]/,'.');

    let valor = parseFloat(string);

    return valor;

}