app.factory('TeamFactory', function ($http) {

    var getTeams = function () {
        return $http.get('/api/teams')
        .then(function(res){
            return res.data;
        });
    };


    return {
        getTeams
    };

});
