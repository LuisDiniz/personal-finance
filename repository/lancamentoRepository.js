'use strict';

const sql = require('../util/db');

module.exports = class LancamentoRepository {

    async save (descricao, descricaoOriginal, valor, data) {
        await sql.query(`INSERT INTO Lancamento (
                            Descricao,
                            DescricaoOriginal,
                            Valor,
                            Data
                        )
                        VALUES (
                            ${descricao ? descricao : descricaoOrignal},
                            ${descricaoOrignal},
                            ${valor},
                            ${data},
                        )`);
    }

    async findAll () {
        return await sql.query(`SELECT * FROM Lancamento`);
    }

    async findLancamentoDuplicado (descricaoOrignal, valor, data) {
        let success = false;
        let result = await sql.query(`SELECT 1 
                                      FROM Lancamento
                                      WHERE DescricaoOriginial = ${descricaoOrignal}
                                      AND Valor = ${valor}
                                      AND Data = ${data}`);
        success = result.recordsets.length > 1 ? true : false;
        return success;                              
    }

}
