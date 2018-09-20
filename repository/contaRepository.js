'use strict';

const sql = require('../util/db');

module.exports = class ContaRepository {

    async findAll () {
        return await sql.query(`SELECT * FROM Conta`);
    }

    async atualizarSaldo (contaId, saldo) {
        return await sql.query(`UPDATE Conta 
                                SET Saldo = ${saldo}
                                WHERE ContaId = ${contaId}`);
    }

}
