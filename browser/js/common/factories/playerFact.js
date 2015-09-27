app.factory('PlayerFactory', function ($http) {

    var getPlayers = function () {
        return $http.get('/api/players')
        .then(function(res){
            return res.data;
        });

    };


    //Helper
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
 
    var getPtTotal = function(players){
        var x = 0;
        players.forEach(function(player){
            x+=player.pts;
        });
        return x;
    };


    return {
        getPtTotal,
        getPlayers
        };

});
