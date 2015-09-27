app.config(function ($stateProvider) {
    $stateProvider.state('home.team', {
        url: 'team/:number',
        templateUrl: 'js/team/team.html',
        controller: 'TeamCtrl',
        resolve: {
            selectedTeam: function($stateParams, TeamFactory,teams){
                return TeamFactory.getTeamByNum(teams, $stateParams.number);
            }
        }
    });
});