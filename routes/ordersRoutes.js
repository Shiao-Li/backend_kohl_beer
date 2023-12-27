const OrdersController = require('../controllers/ordersController');
const passport = require('passport');

module.exports = (app) => {
    // Crear orden
    app.post('/api/orders/create', passport.authenticate('jwt', { session: false }), OrdersController.create);

    // LISTAR ORNES
    app.get('/api/orders/findByStatus/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByStatus);

    // LISTAR ORDENES POR ENTRENGAR DEL DELIVERY
    app.get('/api/orders/findByDeliveryAndStatus/:id_delivery/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByDeliveryAndStatus);

    // LISTAR ORDENES DEL CLIENTE POR ESTATUS 
    app.get('/api/orders/findByClientAndStatus/:id_client/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByClientAndStatus);

    // Actualizar estado -> DESPACHADO
    app.put('/api/orders/updateToDispatched', passport.authenticate('jwt', {session: false}), OrdersController.updateToDispatched);

    // Actualizar estado -> EN CAMINO
    app.put('/api/orders/updateToOnTheWay', passport.authenticate('jwt', {session: false}), OrdersController.updateToOnTheWay);

    // Actualizar estado -> ENTREGADO
    app.put('/api/orders/updateToDelivered', passport.authenticate('jwt', {session: false}), OrdersController.updateToDelivered);
}