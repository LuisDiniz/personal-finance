'use strict';

const sql = require('../util/db');
const LancamentoHistoricoCategoria = require('../model/lancamentoHistoricoCategoria');

module.exports = class LancamentoHistoricoCategoriaRepository {

    async findAll () {
        let listaLancamentoHistoricoCategoria = [];
        let result = await sql.query(`SELECT * FROM LancamentoHistoricoCategoria`);
        for (const record of result.recordset) {
            let lancamentoHistoricoCategoria = new LancamentoHistoricoCategoria();
            lancamentoHistoricoCategoria.descricao = record.Descricao;
            lancamentoHistoricoCategoria.descricaoParcial = record.DescricaoParcial;
            lancamentoHistoricoCategoria.categoriaId = record.CategoriaId;
            listaLancamentoHistoricoCategoria.push(lancamentoHistoricoCategoria);
        }
        return listaLancamentoHistoricoCategoria;
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
