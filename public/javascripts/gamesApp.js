var app = angular.module("gameApp", ['ngRoute', 'ngResource']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'main.html',
			controller: 'gameController'
		})
		.when('/trophies', {
			templateUrl: 'trophies.html',
		})
});

app.factory('gameService', function($resource){
	return $resource('/api/games');
});

app.controller("gameController", function($scope, $http, gameService){
	$scope.games = [];
	$scope.newGame = {name: '', platform: ''};
	
	$scope.games = gameService.query();
	
	$scope.post = function(){
		gameService.save($scope.newGame, function(){
			$scope.games.push($scope.newGame);
			$scope.newGame = {name: '', platform:''};
		});
	}
});