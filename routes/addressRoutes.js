const AddressController = require('../controllers/addressController');
const passport = require('passport');

module.exports = (app) => {
    // Crear una nueva direccion
    app.post('/api/address/create', passport.authenticate('jwt', { session: false }), AddressController.create);
    // Listar direcciones por usuario
    app.get('/api/address/findByUser/:id_user', passport.authenticate('jwt', { session: false }), AddressController.findByUser);
}