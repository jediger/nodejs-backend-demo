var router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/birds', require('./birds'));
router.use('/sightings', require('./sightings'));

module.exports = router;
