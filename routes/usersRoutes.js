const UsersController = require('../controllers/usersController');
const passport = require('passport');

module.exports = (app, upload) => {
    //obteniendo los datos
    app.get('/api/users/getAll', UsersController.getAll);

    // Usuario por id
    app.get('/api/users/findById/:id', passport.authenticate('jwt', {session: false}), UsersController.findById);

    //crear datos, con imagen del usuario
    app.post('/api/users/create', upload.array('image', 1), UsersController.registerWithImage);

    //login
    app.post('/api/users/login', UsersController.login);

    //logout
    app.post('/api/users/logout', UsersController.logout);

    //Actualizar datos
    app.put('/api/users/update', passport.authenticate('jwt', {session: false}), upload.array('image', 1), UsersController.update)

    // Listar reartidores
    app.get('/api/users/findDeliveryMen', passport.authenticate('jwt', {session: false}), UsersController.findDeliveryMen);
}