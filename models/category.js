const db = require('../config/config');

const Category = {};

// CONSULTA RECIBIR TODAS LAS CATEGORIAS
Category.getAll = () => {

    const sql = `
        SELECT
            id,
            name,
            description
        FROM
            categories
        ORDER BY
            name
    `;

    return db.manyOrNone(sql);
}

// CONSULTA CREAR CATEGORIA
Category.create = (category) => {
    const sql = `
    INSERT INTO
        categories(
            name,
            description,
            created_at,
            updated_at
        )
    VALUES ($1, $2, $3, $4) RETURNING id
    `;
    return db.oneOrNone(sql, [
        category.name,
        category.description,
        new Date(),
        new Date()
    ]);
}

module.exports = Category;