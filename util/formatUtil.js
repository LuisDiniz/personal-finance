'use strict';

/**
 * Remove máscara da moeda "Real" e formata para inserir no banco de dados. 
 * @param {*} valor Valor com máscara da moeda "Real" 
 */
exports.formatReal = (valor) => {

    // Remove máscara do Real
    valor = valor.replace(/(R\$)/,'');
    // Remove espaços em brancho
    valor = valor.replace(/\s/g,'');
    // Troca ',' por '.'
    valor = valor.replace(/[,]/,'.');

    let valorFormatado = parseFloat(valor);

    return valorFormatado;

}

/**
 * Remove aspas simples do texto informado.
 * @param {*} texto String que deve ser formatada.
 */

 exports.removerAspasSimples = (texto) => {
     return texto.replace(/[']/g, '');
 }