const CategoriesController = require('../controllers/categoriesController');
const passport = require('passport');

module.exports = (app) => {
    // Obtener categorias
    app.get('/api/categories/getAll', passport.authenticate('jwt', { session: false }), CategoriesController.getAll);
    
    // Crear categorias
    app.post('/api/categories/create', passport.authenticate('jwt', { session: false }), CategoriesController.create);
}