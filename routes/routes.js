const router = require('express').Router()

router.use('/projects', require('./projectRoutes'));
router.use('/contact', require('./contactRoute'));

module.exports = router;