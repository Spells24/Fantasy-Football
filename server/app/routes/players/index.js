'use strict';
var router = require('express').Router();
module.exports = router;
var Player = require('mongoose').model('Player');

router.get('/', function(req,res,next){
	Player.find().exec()
	.then(function(players){
		res.json(players);
	});
});
router.get('/team/:id', function(req,res,next){
	Player.find({fantTeam: req.params.id}).exec()
	.then(function(players){
		res.json(players);
	});
});

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
