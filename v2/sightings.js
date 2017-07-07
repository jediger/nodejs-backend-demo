var router = require('express').Router();
var sightingsApi = require('../api/sightings');
var birdApi = require('../api/birds');
var authApi = require('../api/auth');

router.get('/user/:userId', authApi.verifyToken, function(req, res) {
	sightingsApi.getSightingsByUser(Number.parseInt(req.params.userId)).then(function(sightings) {
		res.json(sightings);
		/*let sightingsP = sightings.map(function(sighting) {
			return new Promise(function(resolve, reject) {
				birdApi.getBird(sighting.bird).then(function(bird) {
					sighting.bird = bird;
					resolve(sighting);
				});
			});
		});
		Promise.all(sightingsP).then(values => {
			res.json(values);
		});*/
	}, function(error) {
		res.status(error.code).send(error.message);
	});
});

router.post('/user/:userId', authApi.verifyToken, function(req, res) {
	birdApi.getBird(req.body.bird).then(function(bird) {
		let sighting = req.body;
		sighting.bird = bird;
		sightingsApi.addSighting(sighting, Number.parseInt(req.params.userId)).then(function(sighting) {
			res.json(sighting);
		});
	});

});

router.delete('/user/:userId/:id', authApi.verifyToken, function(req, res) {
	sightingsApi.deleteSighting(req.params.id, Number.parseInt(req.params.userId)).then(function(result) {
		res.json(result);
	}, function(error) {
		res.status(error.code).send(error.message);
	});
});

module.exports = router;
