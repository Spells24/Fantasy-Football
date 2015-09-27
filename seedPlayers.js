var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var cheerio = require('cheerio');
var agent = Promise.promisifyAll(require('superagent').agent());
var Player = mongoose.model('Player');
var Team = mongoose.model('Team');
var request = require('superagent-bluebird-promise');


var week = 3;

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


function seedPlayers(teamNum) {
    return Team.find().exec()
    .then(function(teams){
        var x;
        for(var i = 0; i<teams.length; i++){
            if(teamNum==teams[i].number)
                x=teams[i]._id;
        }
        var players = [];
        var url = 'http://games.espn.go.com/ffl/boxscorefull?leagueId=509460&teamId='+teamNum+'&scoringPeriodId='+week+'&seasonId=2015&view=scoringperiod&version=full';
        return request
        .get(url)
        .then(function(result){
            var $ = cheerio.load(result.text);
            $('#playertable_0 .pncPlayerRow').each(function(ind,e){
                var p = {};
                p.fantTeam = x;
                p.slot = e.children[0].children[0].data;
                p.name = e.children[1].children[0].children[0].data;
                p.team = splitTeamAndPos(e.children[1].children[1].data.split(' ')[1]).split(' ')[0];
                p.position = splitTeamAndPos(e.children[1].children[1].data.split(' ')[1]).split(' ')[1];
                p.opp = e.children[2].children[0].children[0].children[0].data;
                p.gameStatus = e.children[3].children[2].children[0].data;
                p.compOverAtt = e.children[5].children[0].children[0].data;
                p.passYards = e.children[6].children[0].children[0].data;
                p.passTds = e.children[7].children[0].children[0].data;
                p.ints = e.children[8].children[0].children[0].data;
                p.rushAtt = e.children[10].children[0].children[0].data;
                p.rushYards = e.children[11].children[0].children[0].data;
                p.rushTds = e.children[12].children[0].children[0].data;
                p.recs = e.children[14].children[0].children[0].data;
                p.recYards = e.children[15].children[0].children[0].data;
                p.recTds = e.children[16].children[0].children[0].data;
                p.targs = e.children[17].children[0].children[0].data;
                p.twoPC = e.children[19].children[0].children[0].data;
                p.fums = e.children[20].children[0].children[0].data;
                p.randTds = e.children[21].children[0].children[0].data;
                p.pts = e.children[23].children[0].children[0].data;
                players.push(p);
            });
            $('#playertable_1 .pncPlayerRow').each(function(ind,e){
                var p = {};
                p.fantTeam = x;
                p.slot = 'K';
                p.name = e.children[1].children[0].children[0].data;
                p.team = splitTeamAndPos(e.children[1].children[1].data.split(' ')[1]).split(' ')[0];
                p.position = 'K';
                p.opp = e.children[2].children[0].children[0].children[0].data;
                p.gameStatus = e.children[3].children[2].children[0].data;
                p.underForty = e.children[5].children[0].children[0].data
                p.underFifty = e.children[6].children[0].children[0].data
                p.fiftyPlus = e.children[7].children[0].children[0].data
                p.totFG = e.children[8].children[0].children[0].data
                p.XP = e.children[9].children[0].children[0].data
                p.pts = e.children[11].children[0].children[0].data
                players.push(p);
            });
            $('#playertable_2 .pncPlayerRow').each(function(ind,e){
                var p = {};
                p.fantTeam = x;
                p.slot = 'D/ST';
                p.name = e.children[1].children[0].children[0].data;
                p.position = 'D/ST';
                p.opp = e.children[2].children[0].children[0].children[0].data;
                p.gameStatus = e.children[3].children[2].children[0].data;
                p.DTDs = e.children[5].children[0].children[0].data
                p.dInts = e.children[6].children[0].children[0].data
                p.FR = e.children[7].children[0].children[0].data
                p.SCK = e.children[8].children[0].children[0].data
                p.SFTY = e.children[9].children[0].children[0].data
                p.BLK = e.children[10].children[0].children[0].data
                p.PA = e.children[11].children[0].children[0].data
                p.pts = e.children[13].children[0].children[0].data
                players.push(p);
            });
            return Player.create(players);
        },function(err){
            console.error(err);
        });
    });
}

connectToDb
.then(function (){
    console.log('what the duece..');
    return Player.remove({}).exec();
})
.then(function(){
    return seedPlayers(1);
})
.then(function(){
    return seedPlayers(2);
})
.then(function(){
    return seedPlayers(3);
})
.then(function(){
    return seedPlayers(4);
})
.then(function(){
    return seedPlayers(5);
})
.then(function(){
    return seedPlayers(6);
})
.then(function(){
    return seedPlayers(7);
})
.then(function(){
    return seedPlayers(8);
})
.then(function(){
    return seedPlayers(9);
})
.then(function(){
    return seedPlayers(10);
})
.then(function(){
    return seedPlayers(11);
})
.then(function(){
    return seedPlayers(12);
})
.then(function (player) {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
})
.catch(function (err) {
        console.error(err);
        process.kill(1);
});
