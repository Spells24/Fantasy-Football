'use strict';
var router = require('express').Router();
module.exports = router;
var Team = require('mongoose').model('Team');

router.get('/', function(req,res,next){
	Team.find().exec()
	.then(function(teams){
		res.json(teams);
	});
});

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
