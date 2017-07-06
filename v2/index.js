var router = require('express').Router();

router.use('/users', require('./users'));
router.use('/birds', require('./birds'));

module.exports = router;
