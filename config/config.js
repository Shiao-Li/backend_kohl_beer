// Configuración para la conexión a la base de datos de pgsql
const promise = require('bluebird');
require('dotenv').config();
const pgp = require('pg-promise')({
    promiseLib: promise,
    query: (e) => { }
});

const types = pgp.pg.types;
types.setTypeParser(1114, function (stringValue) {
    return stringValue;
});

const connectionString = process.env.DATABASE_URL;
const sslOptions = { rejectUnauthorized: false };

const db = pgp({
    connectionString: connectionString,
    ssl: sslOptions
});

module.exports = db;