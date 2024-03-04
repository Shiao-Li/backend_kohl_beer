// FUNCION VER USUARIOS
// const userController = require('../controllers/usersController');
// const User = require('../models/user');

// describe('getAll', () => {
//   test('debería obtener todos los usuarios correctamente', async () => {
//     const req = {};
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };
//     const next = jest.fn();

//     // Simula el comportamiento de la función User.getAll
//     User.getAll = jest.fn().mockResolvedValue([{ id: 1, name: 'Usuario1' }, { id: 2, name: 'Usuario2' }]);

//     await userController.getAll(req, res, next);

//     // Verifica que las funciones y métodos esperados se hayan llamado con los argumentos correctos
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Usuario1' }, { id: 2, name: 'Usuario2' }]);

//     // Verifica que next no haya sido llamado (no se esperan errores)
//     expect(next).not.toHaveBeenCalled();
//   });

//   test('debería manejar errores al obtener usuarios', async () => {
//     const req = {};
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };
//     const next = jest.fn();

//     // Simula el comportamiento de la función User.getAll cuando hay un error
//     User.getAll = jest.fn().mockRejectedValue(new Error('Error al obtener usuarios'));

//     await userController.getAll(req, res, next);

//     // Verifica que las funciones y métodos esperados se hayan llamado con los argumentos correctos
//     expect(res.status).toHaveBeenCalledWith(501);
//     expect(res.json).toHaveBeenCalledWith({
//       success: false,
//       message: 'Error al obtener los usuarios',
//     });

//     // Verifica que next no haya sido llamado (ya que se maneja el error en la función)
//     expect(next).not.toHaveBeenCalled();
//   });
// });

// // FUNCION LISTAR REPARTIDORES
// const userController = require('../controllers/usersController');
// const User = require('../models/user');

// describe('findDeliveryMen', () => {
//   test('debería obtener los repartidores correctamente', async () => {
//     const req = {};
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };
//     const next = jest.fn();

//     // Simula el comportamiento de la función User.findDeliveryMen
//     User.findDeliveryMen = jest.fn().mockResolvedValue([
//       { id: 1, name: 'Repartidor1' },
//       { id: 2, name: 'Repartidor2' },
//     ]);

//     await userController.findDeliveryMen(req, res, next);

//     // Verifica que las funciones y métodos esperados se hayan llamado con los argumentos correctos
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith([
//       { id: 1, name: 'Repartidor1' },
//       { id: 2, name: 'Repartidor2' },
//     ]);

//     // Verifica que next no haya sido llamado (no se esperan errores)
//     expect(next).not.toHaveBeenCalled();
//   });

//   test('debería manejar errores al obtener repartidores', async () => {
//     const req = {};
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };
//     const next = jest.fn();

//     // Simula el comportamiento de la función User.findDeliveryMen cuando hay un error
//     User.findDeliveryMen = jest.fn().mockRejectedValue(new Error('Error al obtener repartidores'));

//     await userController.findDeliveryMen(req, res, next);

//     // Verifica que las funciones y métodos esperados se hayan llamado con los argumentos correctos
//     expect(res.status).toHaveBeenCalledWith(501);
//     expect(res.json).toHaveBeenCalledWith({
//       success: false,
//       message: 'Error al obtener los repartidores',
//     });

//     // Verifica que next no haya sido llamado (ya que se maneja el error en la función)
//     expect(next).not.toHaveBeenCalled();
//   });
// });

// FUNCION REGISTRAR USUARIO
// const userController = require('../controllers/usersController');
// const User = require('../models/user');
// const Rol = require('../models/rol');

// describe('register', () => {
//   test('debería registrar un usuario correctamente', async () => {
//     const req = {
//       body: {
//         email: 'test@example.com',
//         name: 'TestUser',
//         lastname: 'TestLastName',
//         phone: '123456789',
//         password: 'password123',
//       },
//     };

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     const next = jest.fn();

//     // Simula el comportamiento de las funciones de modelo User y Rol
//     User.create = jest.fn().mockResolvedValue({ id: 123 }); // Simula la creación de un usuario
//     Rol.create = jest.fn().mockResolvedValue(); // Simula la creación de un rol

//     await userController.register(req, res, next);

//     // Verifica que las funciones y métodos esperados se hayan llamado con los argumentos correctos
//     expect(User.create).toHaveBeenCalledWith(req.body);
//     expect(Rol.create).toHaveBeenCalledWith(123, 1); // Simula un rol por defecto
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith({
//       success: true,
//       message: 'El registro se realizo correctamente, ahora inicia sesion',
//       data: 123, // El ID del usuario simulado
//     });

//     // Verifica que next no haya sido llamado (no se esperan errores)
//     expect(next).not.toHaveBeenCalled();
//   });
// });

// FUNCION ACTULIZAR DATOS DEL USUARIO
// const userController = require('../controllers/usersController');
// const User = require('../models/user');
// const { storage } = require('../util/storage'); // Asegúrate de importar la función storage o el módulo que la contiene

// describe('update', () => {
//   test('debería actualizar datos del usuario correctamente', async () => {
//     const req = {
//       body: {
//         user: {
//           // datos del usuario a actualizar
//           id: 123,
//           email: 'test@example.com',
//         name: 'TestUser',
//         lastname: 'TestLastName',
//         phone: '123456789',
//         password: 'password123',
//         },
//       }
//     };

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     const next = jest.fn();

//     // Simula el comportamiento de las funciones de modelo User
//     User.update = jest.fn().mockResolvedValue(); // Simula la actualización de un usuario
//     // Mock de la función storage (asegúrate de ajustarlo según tu implementación)
//     const storageMock = jest.fn().mockResolvedValue('url_de_prueba');
    
//     // Aplicar el mock de storage a la función real en el módulo
//     jest.mock('../util/storage', () => ({
//       storage: storageMock,
//     }));

//     await userController.update(req, res, next);

//     // Verifica que las funciones y métodos esperados se hayan llamado con los argumentos correctos
//     expect(User.update).toHaveBeenCalledWith(req.body.user);
//     expect(storageMock).toHaveBeenCalled(); // Verifica que storage se haya llamado
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith({
//       success: true,
//       message: '¡Los datos del usuario han sido actualizados satisfactoriamente!',
//     });

//     // Verifica que next no haya sido llamado (no se esperan errores)
//     expect(next).not.toHaveBeenCalled();
//   });

// });

// FUNCION LOGIN
// const userController = require('../controllers/usersController');
// const User = require('../models/user');
// const jwt = require('jsonwebtoken');
// const keys = require('../config/keys');

// // Mock de jwt.sign para evitar la generación real de tokens durante las pruebas
// jest.mock('jsonwebtoken', () => ({
//   sign: jest.fn(() => 'fakeToken'),
// }));

// describe('login', () => {
//   test('debería autenticar al usuario correctamente', async () => {
//     const req = {
//       body: {
//         email: 'test@example.com',
//         password: 'password123',
//       },
//     };

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };
 
//     const next = jest.fn();

//     // Simula el comportamiento de la función de modelo User
//     User.findByEmail = jest.fn().mockResolvedValue({
//       id: 123,
//       name: 'TestUser',
//       lastname: 'TestLastName',
//       email: 'test@example.com',
//       phone: '123456789',
//       image: 'test_image.jpg',
//       roles: ['CLIENTE'],
//       password: 'hashedPassword', // Simula una contraseña ya hasheada almacenada en la base de datos
//     });

//     User.isPasswordMatched = jest.fn().mockReturnValue(true); // Simula que la contraseña coincide

//     User.updateToken = jest.fn().mockResolvedValue(); // Simula la actualización del token

//     await userController.login(req, res, next);

//     // Verifica que las funciones y métodos esperados se hayan llamado con los argumentos correctos
//     expect(User.findByEmail).toHaveBeenCalledWith('test@example.com');
//     expect(User.isPasswordMatched).toHaveBeenCalledWith('password123', 'hashedPassword');
//     expect(User.updateToken).toHaveBeenCalledWith(123, 'JWT fakeToken');

//     // Verifica que jwt.sign haya sido llamado con los argumentos correctos
//     expect(jwt.sign).toHaveBeenCalledWith({ id: 123, email: 'test@example.com' }, keys.secretOrKey, {});

//     // Verifica la respuesta enviada
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith({
//       success: true,
//       data: {
//         id: 123,
//         name: 'TestUser',
//         lastname: 'TestLastName',
//         email: 'test@example.com',
//         phone: '123456789',
//         image: 'test_image.jpg',
//         session_token: 'JWT fakeToken',
//         roles: ['CLIENTE'],
//       },
//       message: 'El usuario ha sido autenticado',
//     });

//     // Verifica que next no haya sido llamado (no se esperan errores)
//     expect(next).not.toHaveBeenCalled();
//   });

//   test('debería manejar la autenticación fallida debido a una contraseña incorrecta', async () => {
//     // Simula el comportamiento de la función de modelo User
//     User.findByEmail = jest.fn().mockResolvedValue({
//       id: 123,
//       email: 'test@example.com',
//       password: 'hashedPassword', // Simula una contraseña ya hasheada almacenada en la base de datos
//     });

//     User.isPasswordMatched = jest.fn().mockReturnValue(false); // Simula que la contraseña no coincide

//     const req = {
//       body: {
//         email: 'test@example.com',
//         password: 'passwordIncorrecta',
//       },
//     };

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     const next = jest.fn();

//     await userController.login(req, res, next);

//     // Verifica que las funciones y métodos esperados se hayan llamado con los argumentos correctos
//     expect(User.findByEmail).toHaveBeenCalledWith('test@example.com');
//     expect(User.isPasswordMatched).toHaveBeenCalledWith('passwordIncorrecta', 'hashedPassword');

//     // Verifica la respuesta enviada
//     expect(res.status).toHaveBeenCalledWith(401);
//     expect(res.json).toHaveBeenCalledWith({
//       success: false,
//       message: 'Contraseña incorrecta',
//     });

//     // Verifica que next no haya sido llamado (no se esperan errores)
//     expect(next).not.toHaveBeenCalled();
//   });

//   test('debería manejar la autenticación fallida debido a un usuario no encontrado', async () => {
//     // Simula el comportamiento de la función de modelo User
//     User.findByEmail = jest.fn().mockResolvedValue(null); // Simula que el usuario no fue encontrado

//     const req = {
//       body: {
//         email: 'usuarioNoEncontrado@example.com',
//         password: 'password123',
//       },
//     };

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     const next = jest.fn();

//     await userController.login(req, res, next);

//     // Verifica que las funciones y métodos esperados se hayan llamado con los argumentos correctos
//     expect(User.findByEmail).toHaveBeenCalledWith('usuarioNoEncontrado@example.com');

//     // Verifica la respuesta enviada
//     expect(res.status).toHaveBeenCalledWith(401);
//     expect(res.json).toHaveBeenCalledWith({
//       success: false,
//       message: 'El email ingresado no fue encontrado',
//     });

//     // Verifica que next no haya sido llamado (no se esperan errores)
//     expect(next).not.toHaveBeenCalled();
//   });
// });

// FUNCION CERRAR SESION
// const userController = require('../controllers/usersController');
// const User = require('../models/user');

// describe('logout', () => {
//   test('debería cerrar sesión correctamente', async () => {
//     const req = {
//       body: {
//         id: 123,
//       },
//     };

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     const next = jest.fn();

//     // Simula el comportamiento de la función de modelo User
//     User.updateToken = jest.fn().mockResolvedValue(); // Simula la actualización del token

//     await userController.logout(req, res, next);

//     // Verifica que la función y método esperados se hayan llamado con los argumentos correctos
//     expect(User.updateToken).toHaveBeenCalledWith(123, null);

//     // Verifica la respuesta enviada
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith({
//       success: true,
//       message: 'La sesion del usuario se ha cerrado correctamente',
//     });

//     // Verifica que next no haya sido llamado (no se esperan errores)
//     expect(next).not.toHaveBeenCalled();
//   });
// });
