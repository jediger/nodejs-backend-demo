var router = require('express').Router();
var userApi = require('../api/users');

//This method overrides v1's /users/:id
router.get('/:username', function(req, res) {
  userApi.getUserByUsername(req.params.username).then(function(user) {
    res.json(user);
  }, function(error) {
    res.status(error.code).send(error.message);
  });
});

router.use('', require('../v1/users'));

module.exports = router;
