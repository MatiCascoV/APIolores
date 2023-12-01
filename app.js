// app.js
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
// Configura middlewares y extensiones según tus necesidades

// Middleware para parsear JSON
app.use(express.json());

// Configuración de sesión
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Rutas de autenticación
app.use('/auth', authRoutes);

// Directorio público
app.use(express.static('public'));


// Escucha en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
