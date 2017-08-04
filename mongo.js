const MongoClient = require('mongodb').MongoClient
var mongoConfig = require('./config').mongo;

var db = new Promise(function(resolve, reject) {
	MongoClient.connect(mongoConfig, (err, database) => {
		if(err) {
			return reject(err);
		}
		console.log('Connected to Mongo');
		resolve(database);
	});
});

module.exports = db;
