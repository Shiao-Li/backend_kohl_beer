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

// INICIALIZAR FIREBASE ADMIN
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const upload = multer({
  storage: multer.memoryStorage()
})

// RUTAS
const users = require('./routes/usersRoutes')
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

//Llamando a las rutas
users(app, upload);
categories(app);
products(app, upload);
address(app);
orders(app);

app.listen(app.get('port'), () => {
  console.log(`Server ok on http://localhost:${app.get('port')}`);
});

//error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});

module.exports = {
  app: app,
  server: server
}