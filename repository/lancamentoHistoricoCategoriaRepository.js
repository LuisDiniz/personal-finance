'use strict';

const sql = require('../util/db');

module.exports = class LancamentoHistoricoCategoriaRepository {

    async findAll () {
        return await sql.query(`SELECT * FROM LancamentoHistoricoCategoria`);
    }

    async save (categoriaId, descricaoParcial, descricao) {
        await sql.query(`INSERT INTO LancamentoHistoricoCategoria (
                            CategoriaId,
                            DescricaoParcial,
                            Descricao
                        )
                        VALUES (
                            ${categoriaId},
                            '${descricaoParcial}',
                            '${descricao}'
                        )`);
    }    

}
