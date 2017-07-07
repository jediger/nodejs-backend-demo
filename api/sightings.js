const mongo = require('../mongo');
var ObjectId = require('mongodb').ObjectID;

var db;

mongo.then(function(_db) {
	db = _db;
});

module.exports = {
	getSightingsByUser: function(userId) {
		return new Promise(function(resolve, reject) {
			db.collection('sightings').find({user: userId}).toArray(function(err, result) {
				if(err) {
					return reject({code: 404, message: err});
				}
				resolve(result);
			});
		});
	},
	addSighting: function(sighting, userId) {
		sighting.user = userId;
		return new Promise(function(resolve, reject) {
			db.collection('sightings').save(sighting, (err, result) => {
				if(err) {
					return reject({code: 500, message: err});
				}

				resolve(result);
			});
		});
	},
	deleteSighting: function(id, userId) {
		return new Promise(function(resolve, reject) {
			db.collection('sightings').deleteOne({_id: ObjectId(id), user: userId}, (err, result) => {
				if(err) {
					return reject({code: 500, message: err});
				}

				if(result.n !== 1) {
					return reject({code: 404, message: "Record not found"});
				}

				resolve(result);
			});
		});
	}
};
