app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
        	players: function (PlayerFactory){
        		return PlayerFactory.getPlayers();
        	},
        	teams: function (TeamFactory){
        		return TeamFactory.getTeams();
        	}
        }
    });
});