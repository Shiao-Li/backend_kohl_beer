const ProductsController = require('../controllers/productsController');
const passport = require('passport');

module.exports = (app, upload) => {
    // Crear productos
    app.post('/api/products/create', passport.authenticate('jwt', {session: false}), upload.array('image', 3), ProductsController.create);
}