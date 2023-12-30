const ProductsController = require('../controllers/productsController');
const passport = require('passport');

module.exports = (app, upload) => {
    
    // Listar productos por categoria
    app.get('/api/products/findByCategory/:id_category', passport.authenticate('jwt', {session: false}), ProductsController.findByCategory);

    // Listar buscador de productos
    app.get('/api/products/findByCategoryAndProductName/:id_category/:product_name', passport.authenticate('jwt', {session: false}), ProductsController.findByCategoryAndProductName);
    
    // Crear productos
    app.post('/api/products/create', passport.authenticate('jwt', {session: false}), upload.array('image', 3), ProductsController.create);
}