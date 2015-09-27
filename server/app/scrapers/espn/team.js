var router = require('express').Router();
var cheerio = require('cheerio');
var agent = require('superagent').agent();
var Player = require('mongoose').model('Player');
module.exports = router;

function splitTeamAndPos(el){
	var newStr = "";
	for(var i = 0; i<el.length; i++){
		if(el[i].toUpperCase()!=el[i].toLowerCase()){
			newStr+=el[i];
		}
		else newStr+=" ";
	}
	return newStr;	
}

router.use('/', function(req,res,next){
	var url = 'http://games.espn.go.com/ffl/boxscorefull?leagueId=509460&teamId='+req.query.teamId+'&scoringPeriodId='+req.query.week+'&seasonId=2015&view=scoringperiod&version=full';
	var players = [];
	var count = 0;
	console.log('oi');
	agent
	.get(url)
	.end(function(err,result){
		if(err) console.error(err);
		var $ = cheerio.load(result.text);
		$('.pncPlayerRow').each(function(ind,e){
			if(count>6) return;
			var p = {};
			p.slot = e.children[0].children[0].data;
			p.name = e.children[1].children[0].children[0].data;
			p.team = splitTeamAndPos(e.children[1].children[1].data.split(' ')[1]).split(' ')[0];
			p.position = splitTeamAndPos(e.children[1].children[1].data.split(' ')[1]).split(' ')[1];
			p.opp = e.children[2].children[0].children[0].children[0].data;
			p.gameStatus = e.children[3].children[2].children[0].data;
			p.compOverAtt = e.children[5].children[0].data;
			p.passYards = e.children[6].children[0].data;
			p.passTds = e.children[7].children[0].data;
			p.ints = e.children[8].children[0].data;
			p.rushAtt = e.children[10].children[0].data;
			p.rushYards = e.children[11].children[0].data;
			p.rushTds = e.children[12].children[0].data;
			p.recs = e.children[14].children[0].data;
			p.recYards = e.children[15].children[0].data;
			p.recTds = e.children[16].children[0].data;
			p.targs = e.children[17].children[0].data;
			p.twoPC = e.children[19].children[0].data;
			p.fums = e.children[20].children[0].data;
			p.randTds = e.children[21].children[0].data;
			p.pts = e.children[23].children[0].data;
			players.push(p);
			count++;
		});
		Player.create(players)
		.then(function(result){
			res.json(result);
		});
	});
});
