var router = require('express').Router();
var userApi = require('../api/users');

router.get('/', function(req, res) {
  userApi.getAllUsers().then(function(users) {
    res.json(users);
  }, function(error) {
    res.status(error.code).send(error.message);
  });
});

router.get('/:id', function(req, res) {
  userApi.getUser(Number.parseInt(req.params.id)).then(function(user) {
    res.json(user);
  }, function(error) {
    res.status(error.code).send(error.message);
  });
});

router.post('/', function(req, res) {
  userApi.addUser(req.body.username, req.body.age, req.body.gender).then(function(userId) {
    userApi.getUser(userId).then(function(user) {
      res.json(user);
    });
  }, function(error) {
    res.status(error.code).send(error.message);
  });
});

router.put('/:id', function(req, res) {
  userApi.updateUser(Number.parseInt(req.params.id), req.body.age, req.body.gender).then(function() {
    userApi.getUser(req.params.id).then(function(user) {
      res.json(user);
    });
  }, function(error) {
    res.status(error.code).send(error.message);
  });
});

router.delete('/:id', function(req, res) {
  userApi.deleteUser(Number.parseInt(req.params.id)).then(function() {
    res.sendStatus(200);
  }, function(error) {
    res.status(error.code).send(error.message);
  });
});

module.exports = router;
