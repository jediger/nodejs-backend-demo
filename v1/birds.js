var router = require('express').Router();
var birdApi = require('../api/birds');

router.get('/', function(req, res) {
  birdApi.getAllBirds().then(function(birds) {
    res.json(birds);
  }, function(error) {
    res.status(error.code).send(error.message);
  });
});

router.get('/:id', function(req, res) {
  birdApi.getBird(req.params.id).then(function(bird) {
    res.json(bird);
  }, function(error) {
    res.status(error.code).send(error.message);
  });
});

router.post('/', function(req, res) {
  birdApi.addBird(req.body.name).then(function(birdId) {
    birdApi.getBird(birdId).then(function(bird) {
      res.json(bird);
    });
  }, function(error) {
    res.status(error.code).send(error.message);
  });
});

module.exports = router;
