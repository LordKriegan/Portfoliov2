const router = require('express').Router()

router.use('/projects', require('./projectRoutes'));
router.use('/contact', require('./contactRoute'));
router.use('/login', require('./loginRoute'));

module.exports = router;