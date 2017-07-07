var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('../config');

var tokenLifetime = '24h';

module.exports = {
	createToken: function(user) {
		return jwt.sign(user, config.secret, {
			expiresIn: tokenLifetime
		});
	},
	verifyToken: function(req, res, next) {
		var token = req.headers['x-access-token'];

		if(token) {
			jwt.verify(token, config.secret, function(error, decoded) {
				if(error) {
					return res.status(403).send("Token authentication failed");
				}

				req.user = decoded;
				next();
			});
		} else {
			return res.status(403).send("Missing x-access-token header");
		}
	},
	renewToken: function(user) {
		return jwt.sign(user, config.secret, {
			expiresIn: tokenLifetime
		});
	},
	checkPassword: function(password, hash) {
		return bcrypt.compareSync(password, hash);
	},
	encryptPassword: function(password) {
		var salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(password, salt);
	}
};
