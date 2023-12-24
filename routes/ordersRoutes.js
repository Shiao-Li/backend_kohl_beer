const OrdersController = require('../controllers/ordersController');
const passport = require('passport');

module.exports = (app) => {
    // Crear orden
    app.post('/api/orders/create', passport.authenticate('jwt', { session: false }), OrdersController.create);

    // LISTAR ORNES
    app.get('/api/orders/findByStatus/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByStatus);

    // Actualizar estado -> DESPACHADO
    app.put('/api/orders/updateToDispatched', passport.authenticate('jwt', {session: false}), OrdersController.updateToDispatched);

}