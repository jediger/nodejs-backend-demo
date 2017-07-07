var router = require('express').Router();
var userApi = require('../api/users');
var authApi = require('../api/auth');

router.get('/', authApi.verifyToken, function(req, res) {
	if(req.user.admin !== 1) {
		return res.status(403).send("Access Denied");
	}
	userApi.getAllUsers().then(function(users) {
		res.json(users);
	}, function(error) {
		res.status(error.code).send(error.message);
	});
});

router.get('/me', authApi.verifyToken, function(req, res) {
	res.json(req.user);
});

router.get('/:id', authApi.verifyToken, function(req, res) {
	userApi.getUser(Number.parseInt(req.params.id)).then(function(user) {
		res.json(user);
	}, function(error) {
		res.status(error.code).send(error.message);
	});
});

router.post('/', authApi.verifyToken, function(req, res) {
	userApi.addUser(req.body.username, req.body.age, req.body.gender, req.body.password).then(function(userId) {
		userApi.getUser(userId).then(function(user) {
			res.json(user);
		});
	}, function(error) {
		res.status(error.code).send(error.message);
	});
});

router.put('/:id', authApi.verifyToken, function(req, res) {
	userId = req.user.id;
	if(req.user.admin === 1) {
		userId = Number.parseInt(req.params.id);
	}
	userApi.updateUserInfo(userId, req.body.age, req.body.gender).then(function() {
		userApi.getUser(userId).then(function(user) {
			res.json(user);
		});
	}, function(error) {
		res.status(error.code).send(error.message);
	});
});

router.delete('/:id', authApi.verifyToken, function(req, res) {
	if(req.user.admin !== 1 || req.user.id !== Number.parseInt(req.params.id)) {
		res.status(403).send("Access Denied");
	}
	userApi.deleteUser(Number.parseInt(req.params.id)).then(function() {
		res.sendStatus(200);
	}, function(error) {
		res.status(error.code).send(error.message);
	});
});

module.exports = router;
