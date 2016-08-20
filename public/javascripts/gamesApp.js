var app = angular.module("gameApp", ['ngRoute', 'ngResource']).run(function($http,$rootScope) {
		$rootScope.authenticated = false;
		$rootScope.current_user = 'Guest';
		
		$rootScope.signout = function(){
			$http.get('auth/signout');
			$rootScope.authenticated = false;
			$rootScope.current_user = 'Guest';
		};
});

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'main.html',
			controller: 'gameController'
		})
		.when('/trophies', {
			templateUrl: 'trophies.html',
		})
		.when('/signin', {
			templateUrl: 'signin.html',
			controller: 'authController'
		})
		.when('/signup', {
			templateUrl: 'signup.html',
			controller: 'authController'
		})
});

app.factory('gameService', function($resource){
	return $resource('/api/games');
});

app.controller("gameController", function($scope, gameService){
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

app.controller('authController', function($scope,$http,$location,$rootScope){
	$scope.user = {username: '', password: ''};
	$scope.msg='';
	
	$scope.signin = function(){
		$http.post('/auth/signin', $scope.user).success(function(response){
			if(response.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.current_user = response.user.username;
				$location.path('/');
			}
			else {
				$scope.msg = response.message;
			}
		});
	};
	
	$scope.signup = function(){
		$http.post('/auth/signup', $scope.user).success(function(response){
			if(response.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.current_user = response.user.username;
				$location.path('/');
			}
			else {
				$scope.msg = response.message;
			}
		});
	};
});