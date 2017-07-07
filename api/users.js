var db = require('../mysql');
var authApi = require('./auth');

module.exports = {
	getAllUsers: function() {
		return db.query('SELECT id, username, age, gender, admin FROM users');
	},
	getUser: function(id, includePassword) {
		return db.get('SELECT * FROM users WHERE id = ?', [id]).then(function(user) {
			if(!includePassword) {
				delete user.password;
			}
			return user;
		});
	},
	getUserByUsername: function(username, includePassword) {
		return db.get('SELECT * FROM users WHERE username = ?', [username]).then(function(user) {
			if(!includePassword) {
				delete user.password;
			}
			return user;
		});
	},
	addUser: function(username, age, gender, password) {
		return db.add('users', {username: username, age: age, gender: gender, password: authApi.encryptPassword(password)});
	},
	updateUserInfo: function(userId, age, gender) {
		return db.update('users', userId, {age: age, gender: gender});
	},
	deleteUser: function(userId) {
		return db.delete('users', userId);
	},
	updatePassword: function(userId, password) {
		return db.update('users', userId, {password: authApi.encryptPassword(password)});
	}
};
