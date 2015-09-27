app.factory('PlayerFactory', function ($http) {

    var getPlayers = function () {
        return $http.get('/api/players')
        .then(function(res){
            return res.data;
        });
    };
    var getPlayersByTeam = function(team){
        return $http.get('/api/players/team/'+team._id)
        .then(function(res){
            return res.data;
        });
    };

    var orderPlayers = function(players){
        var pos = ['QB','RB','RB','WR','WR','TE','FLEX','K','D/ST'];
        var newArr = [];
        for(var i = 0; i<pos.length; i++){
            for(var j = 0; j<players.length; j++){
                if(players[j].slot==pos[i]){
                    newArr.push(players[j]);
                    players.splice(j,1); 
                    break;
                } 
            }
        }
        return newArr;
    };


    return {
        orderPlayers,
        getPlayers,
        getPlayersByTeam
        };

});
