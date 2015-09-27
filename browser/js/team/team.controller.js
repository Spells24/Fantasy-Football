app.controller('TeamCtrl', function ($stateParams,$scope,selectedTeam,TeamFactory,PlayerFactory) {

	$scope.regCats = ['slot','name','team','position','opp','gameStatus','compOverAtt','passYards','passTds','ints','rushAtt','rushYards','rushTds','recs','recYards','recTds','targs','twoPC','fums','randTds','pts'];
	$scope.kCats = ['slot','name','team','position','opp','gameStatus','underForty','underFifty','fiftyPlus','XP','totFG','pts'];
	$scope.dCats = ['slot','name','team','position','opp','gameStatus','DTDs','FR','SCK','SFTY','dInts','BLK','PA','pts'];
	$scope.selectedTeam = selectedTeam;
	$scope.total = function(pa1,pa2,pa3){
		var tot = 0;
		pa1.forEach(function(p){
			tot+=p.pts;
		});
		pa2.forEach(function(p){
			tot+=p.pts;
		});
		pa3.forEach(function(p){
			tot+=p.pts;
		});
		return tot;
	};

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
app.filter('teamPlayer',function(){
	return function(input,teamId){
		var out=[];
		input.forEach(function(e){
			if(e.fantTeam==teamId) out.push(e);
		});
		return out;
	};
});