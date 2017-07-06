var db = require('../db');

module.exports = {
  getAllUsers: function() {
    return db.query('SELECT * FROM users');
  },
  getUser: function(id) {
    return db.get('SELECT * FROM users WHERE id = ?', [id]);
  },
  getUserByUsername: function(username) {
    return db.get('SELECT * FROM users WHERE username = ?', [username]);
  },
  addUser: function(username, age, gender) {
    return db.add('users', {username: username, age: age, gender: gender});
  },
  updateUser: function(userId, age, gender) {
    return db.update('users', userId, {age: age, gender: gender});
  },
  deleteUser: function(userId) {
    return db.delete('users', userId);
  }
};
