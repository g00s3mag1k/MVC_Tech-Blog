const router = require('express').Router();
const dashBoardRoutes = require('dashBoardRoutes');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashBoardRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;