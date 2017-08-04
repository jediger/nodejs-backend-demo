var mysql = require('mysql');
var config = require('./config').mysql;

var pool = mysql.createPool({
	connectionLimit: config.connectionLimit,
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
});

var db_tables = [
	'birds',
	'users'
];

module.exports = {
	testConnection: function() {
		return new Promise(function(resolve, reject) {
			pool.getConnection(function(err, connection) {
				if(err) {
					return reject('Error connecting to MySQL: ' + err.stack);
				}
				console.log('Connected to MySQL')
				resolve();
				connection.release();
			});
		});
	},
	query: function(queryString, params) {
		return new Promise(function(resolve, reject) {
			pool.query(queryString, params, function(error, results, fields) {
				if(error) {
					return reject({code: 500, message: error.code});
				}

				if(results.length < 1) {
					return reject({code: 404, message: "Record not found"})
				}
				resolve(results);
			});
		});
	},
	get: function(queryString, params) {
		return new Promise(function(resolve, reject) {
			pool.query(queryString, params, function(error, results, fields) {
				if(error) {
					return reject({code: 500, message: error.code});
				}

				if(results.length < 1) {
					return reject({code: 404, message: "Record not found"})
				}
				resolve(results[0]);
			});
		});
	},
	add: function(table, params) {
		return new Promise(function(resolve, reject) {
			if(db_tables.indexOf(table) === -1) {
				return reject({code: 500, message: 'Invalid table name'});
			}

			pool.query('INSERT INTO ' + table + ' SET ?', params, function(error, results, fields) {
				if(error) {
					return reject({code: 500, message: error.code});
				}

				resolve(results.insertId);
			});
		});
	},
	update: function(table, id, params) {
		return new Promise(function(resolve, reject) {
			if(db_tables.indexOf(table) === -1) {
				return reject({code: 500, message: 'Invalid table name'});
			}
			if(!Number.isInteger(id)) {
				return reject({code: 500, message: 'Non Integer id'});
			}
			let updateKeys = Object.keys(params).map(function(key) {
				return key + ' = ? ';
			});
			let updateValues = Object.values(params);
			updateValues.unshift(table);
			updateValues.push(id);

			pool.query('UPDATE ?? SET ' + updateKeys + ' WHERE id = ?', updateValues, function(error, results, fields) {
				if(error) {
					return reject({code: 500, message: error.code});
				}

				resolve(results);
			});
		});
	},
	delete: function(table, id) {
		return new Promise(function(resolve, reject) {
			if(db_tables.indexOf(table) === -1) {
				return reject({code: 500, message: 'Invalid table name'});
			}
			if(!Number.isInteger(id)) {
				return reject({code: 500, message: 'Non Integer id'});
			}
			pool.query('DELETE FROM ?? WHERE id = ?', [table, id], function(error, results, fields) {
				if(error) {
					return reject({code: 500, message: error.code});
				}
				resolve(results);
			});
		});
	}
};
