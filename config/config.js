// Importar la biblioteca dotenv y cargar las variables de entorno desde el archivo .env
require('dotenv').config();

const promise = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: promise });

// Obtener la URL de conexión desde la variable de entorno
const connectionString = process.env.DATABASE_URL;

const db = pgp(connectionString);

module.exports = db;