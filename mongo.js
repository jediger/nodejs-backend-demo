const MongoClient = require('mongodb').MongoClient

var db = new Promise(function(resolve, reject) {
	MongoClient.connect('mongodb://127.0.0.1:27017/backend-demo', (err, database) => {
		if(err) {
			return reject(err);
		}
		console.log('connected to Mongo');
		resolve(database);
	});
});

module.exports = db;
