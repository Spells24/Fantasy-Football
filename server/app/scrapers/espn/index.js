var router = require('express').Router();
module.exports = router;

router.use('/team', require('./team'));

router.use(function (req, res) {
    res.status(404).end();
});