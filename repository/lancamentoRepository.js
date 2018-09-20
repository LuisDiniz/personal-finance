'use strict';

const sql = require('../util/db');

module.exports = class LancamentoRepository {

    async findAll () {
        return await sql.query(`SELECT * FROM Lancamento`);
    }

    async findLancamentoDuplicado (descricaoOrignal, valor, data) {
        let success = false;
        let result = await sql.query(`SELECT 1 
                                      FROM Lancamento
                                      WHERE DescricaoOriginal = '${descricaoOrignal}'
                                      AND Valor = ${valor}
                                      AND Data = CONVERT(DATE, '${data}', 103)`);
        success = result.recordset.length > 0 ? true : false;
        return success;                              
    }

    async save (contaId, descricaoOriginal, valor, data, categoriaId, descricao) {
        await sql.query(`INSERT INTO Lancamento (
                            ContaId,
                            Descricao,
                            DescricaoOriginal,
                            Valor,
                            Data,
                            CategoriaId
                        )
                        VALUES (
                            ${contaId},
                            '${descricao ? descricao : descricaoOriginal}',
                            '${descricaoOriginal}',
                            ${valor},
                            CONVERT (DATE, '${data}', 103),
                            ${categoriaId ? categoriaId : null}
                        )`);
    }    

}
