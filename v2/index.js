var router = require('express').Router();
var authApi = require('../api/auth');

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/birds', require('./birds'));
router.use('/sightings', require('./sightings'));

module.exports = router;
