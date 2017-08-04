var router = require('express').Router();
var userApi = require('../api/users');
var jwt = require('jsonwebtoken');
var config = require('../config');
var authApi = require('../api/auth');

router.post('/login', function(req, res) {
	userApi.getUserByUsername(req.body.username, true).then(function(user) {
		if(!authApi.checkPassword(req.body.password, user.password)) {
			return res.status(401).send("Incorrect Username or Password");
		}

		delete user.password;
		let token = authApi.createToken(user);

		user.token = token;

		res.json(user);
	}, function(error) {
		res.status(401).send("Incorrect Username or Password");
	});
});

router.put('/password', authApi.verifyToken, function(req, res) {
	userApi.updatePassword(Number.parseInt(req.user.id), req.body.password).then(function() {
		res.sendStatus(200);
	});
});

router.post('/renew', authApi.verifyToken, function(req, res) {
	userApi.getUser(req.user.id).then(function(user) {
		res.json({token: authApi.renewToken(user)});
	});
});

module.exports = router;
