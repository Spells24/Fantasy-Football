'use strict'
var router = require('express').Router();
module.exports = router;

router.use('/espn', require('./espn'));

router.use(function (req, res) {
    res.status(404).end();
});
