// consultas a la tabla users de pgsql
const db = require('../config/config');
const crypto = require('crypto');

const User = {};
// consulta traer todo los usuarios
User.getAll = () => {
    const sql = `SELECT * FROM users`;
    return db.manyOrNone(sql);
};

// consulta buscar por id del usuario - tokens
User.findById = (id, callback) => {
    const sql = `
    SELECT
        id,
        email,
        name,
        lastname,
        image,
        phone,
        password,
        session_token
    FROM
        users
    WHERE
        id = $1`;

    return db.oneOrNone(sql, id).then(user => { callback(null, user); })
}

// Consulta validar correo - login
User.findByEmail = (email) => {
    const sql = `
    SELECT
        id,
        email,
        name,
        lastname,
        image,
        phone,
        password,
        session_token
    FROM 
        users
    WHERE
        email = $1
    `
    return db.oneOrNone(sql, email);
}

// consulta crear nuevo usuario
User.create = (user) => {
    //Encriptando password
    const myPasswordHashed = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = myPasswordHashed;

    const sql = `INSERT INTO users(
        email,
        name,
        lastname,
        phone,
        image,
        password,
        created_at,
        update_at) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;

    return db.oneOrNone(sql, [
        user.email,
        user.name,
        user.lastname,
        user.phone,
        user.image,
        user.password,
        new Date(),
        new Date()

    ]);
}

// Validacion de contraseña encriptada para el login
User.isPasswordMatched = (userPassword, hash) => {
    const myPasswordHashed = crypto.createHash('md5').update(userPassword).digest('hex');
    if (myPasswordHashed === hash) {
        return true;
    }
    return false;
}

module.exports = User;
