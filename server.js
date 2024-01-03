const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const logger = require("morgan");
const cors = require("cors");
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const passport = require('passport');
const io = require("socket.io")(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// SOCKETS
const orderDeliverySocket = require('./sockets/orders_delivery_socket');

// INICIALIZAR FIREBASE ADMIN
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const upload = multer({
  storage: multer.memoryStorage()
});

// RUTAS
const users = require('./routes/usersRoutes');
const categories = require('./routes/categoriesRoutes');
const products = require('./routes/productsRoutes');
const address = require('./routes/addressRoutes');
const orders = require('./routes/ordersRoutes');

const port = process.env.PORT || 3000;

//configuraciones
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.disable('x-powered-by');
app.set('port', port);

// LLAMAR A LOS SOCKETS
orderDeliverySocket(io);

//Llamando a las rutas
users(app, upload);
categories(app);
products(app, upload);
address(app);
orders(app);

// Manejador de errores
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

// Arrancar el servidor
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = {
  app: app,
  server: server
};
