app.controller('TeamCtrl', function ($state,$scope,$stateParams,PlayerFactory) {
	$scope.team = $scope.teams.filter(function(el){
		return el.number==$stateParams.number;
	})[0];
	$scope.players =
	$scope.players.filter(function(el){
		return el.fantTeam==$scope.team._id;
	});
	$scope.players = PlayerFactory.orderPlayers($scope.players);

	$scope.regCats = ['slot','name','team','position','opp','gameStatus','compOverAtt','passYards','passTds','ints','rushAtt','rushYards','rushTds','recs','recYards','recTds','targs','twoPC','fums','randTds','pts'];
	$scope.kCats = ['slot','name','team','position','opp','gameStatus','underForty','underFifty','fiftyPlus','XP','totFG','pts'];
	$scope.dCats = ['slot','name','team','position','opp','gameStatus','DTDs','FR','SCK','SFTY','dInts','BLK','PA','pts'];
});
app.filter('regPlayer',function(){
	return function(input){
		var out=[];
		input.forEach(function(e){
			if(e.position!="K" && e.position!="D/ST") out.push(e);
		});
		return out;
	};
});
app.filter('DPlayer',function(){
	return function(input){
		var out=[];
		input.forEach(function(e){
			if(e.position=="D/ST") out.push(e);
		});
		return out;
	};
});
app.filter('KPlayer',function(){
	return function(input){
		var out=[];
		input.forEach(function(e){
			if(e.position=="K") out.push(e);
		});
		return out;
	};
});