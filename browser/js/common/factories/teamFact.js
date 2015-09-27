app.factory('TeamFactory', function (teams,$http) {
    var getTeams = function () {
        return $http.get('/api/teams')
        .then(function(res){
        	teams = res.data;
            return res.data;
        });
    };
    var getTeamByNum = function(teams,num){
    	var x;
    	teams.forEach(function(team){
    		if(team.number.toString()==num)
    			x = team;
    	});
    	return x;
    };

    return {
    	getTeamByNum,
        getTeams
    };

});
