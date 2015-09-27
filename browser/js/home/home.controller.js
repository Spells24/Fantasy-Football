app.controller('HomeCtrl', function ($state,$scope,teams,players) {
    $scope.players = players;
    $scope.teams = teams;
    $scope.teamPage = function(team){
    	$state.go('home.team', team);
    };
});