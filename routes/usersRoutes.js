const UsersController = require('../controllers/usersController');

module.exports = (app) => {
    //obteniendo los datos
    app.get('/api/users/getAll', UsersController.getAll);
    //crear datos
    app.post('/api/users/create', UsersController.register)
}