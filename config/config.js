//configuracion para la conexion a la base de datos de pgsql
const promise = require('bluebird');
require('dotenv').config();
const options = {
    promiseLib: promise,
    query: (e) => { }
}

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function (stringValue) {
    return stringValue
});

const connectionString = process.env.DATABASE_URL;

const db = pgp(connectionString);

module.exports = db;