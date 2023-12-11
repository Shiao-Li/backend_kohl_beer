const UsersController = require('../controllers/usersController');

module.exports = (app, upload) => {
    //obteniendo los datos
    app.get('/api/users/getAll', UsersController.getAll);
    //crear datos, con imagen del usuario
    app.post('/api/users/create', upload.array('image', 1), UsersController.register);
    //login
    app.post('/api/users/login', UsersController.login);
}