'use strict';

let descricaoParcial = 'Supermercados BH';
let descricaoOriginalLancamento = 'COMPRA CARTAO - COMPRA no estabelecimento SUPERMERCADOS BH LJ111 B'
if (descricaoOriginalLancamento.match(new RegExp(descricaoParcial, 'i')))
    console.log('Achou');
else
    console.log('Não Achou');