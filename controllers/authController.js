// authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

class AuthController {
  async signup(req, res) {
    const { username, password } = req.body;

    try {
      // Verificar si el usuario ya existe
      const existingUser = await userModel.getUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({ error: 'El usuario ya existe' });
      }

      // Crear un nuevo usuario
      const hashedPassword = await bcrypt.hash(password, 10);
      await userModel.createUser(username, hashedPassword);

      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;

    try {
      // Obtener el usuario por nombre de usuario
      const user = await userModel.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Verificar la contraseña
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Generar token JWT
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  }
}

module.exports = new AuthController();
