// userModel.js
const { poolMariaDB, poolMySQL } = require('../config/database');

// Cambia poolMariaDB a poolMySQL si estás utilizando MySQL

class UserModel {
  async createUser(username, password) {
    // Agrega lógica para crear un nuevo usuario en la base de datos
  }

  async getUserByUsername(username) {
    // Agrega lógica para obtener un usuario por nombre de usuario
  }

  // Agrega más métodos según sea necesario
}

module.exports = new UserModel();
