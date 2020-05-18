const router = require('express').Router()
router.use('/projects', require('./projectRoutes'));
router.use('/login', require('./loginRoute'));
router.use('/education', require('./educationRoutes'));
router.use('/workhistory', require('./workHistoryRoutes'));
router.use('/skills', require('./skillsRoutes'));
router.use('/bucket', require('./bucketRoutes'));
module.exports = router;