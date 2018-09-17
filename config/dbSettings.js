const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'P@22w0rd',
    server: 'localhost',
    database: 'PersonalFinance',
    port: 1433,
    options: {
        encrypt: true
    }
}

module.exports = config;