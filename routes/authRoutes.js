// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas relacionadas con la autenticación

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
