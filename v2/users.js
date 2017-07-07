var router = require('express').Router();
var userApi = require('../api/users');
var authApi = require('../api/auth');

//This method overrides v1's /users/:id
router.get('/:username', authApi.verifyToken, function(req, res) {
	userApi.getUserByUsername(req.params.username).then(function(user) {
		res.json(user);
	}, function(error) {
		res.status(error.code).send(error.message);
	});
});

router.use('', require('../v1/users'));

module.exports = router;
