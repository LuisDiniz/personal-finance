'use strict';

const sql = require('../util/db');

module.exports = class LancamentoRepository {

    async findAll () {
        return await sql.query(`SELECT * FROM Lancamento`);
    }

    async findLancamentoDuplicado (lancamento) {
        let success = false;
        let result = await sql.query(`SELECT 1 
                                      FROM Lancamento
                                      WHERE DescricaoOriginal = '${lancamento.descricaoOriginal}'
                                      AND Valor = ${lancamento.valor}
                                      AND Data = CONVERT(DATE, '${lancamento.data}', 103)`);
        success = result.recordset.length > 0 ? true : false;
        return success;                              
    }

    async save (lancamento) {
        await sql.query(`INSERT INTO Lancamento (
                            ContaId,
                            Descricao,
                            DescricaoOriginal,
                            Valor,
                            Data,
                            CategoriaId
                        )
                        VALUES (
                            ${lancamento.contaId},
                            '${lancamento.descricao !== `` ? lancamento.descricao : lancamento.descricaoOriginal}',
                            '${lancamento.descricaoOriginal}',
                            ${lancamento.valor},
                            CONVERT (DATE, '${lancamento.data}', 103),
                            ${lancamento.categoriaId}
                        )`);
    }    

}
