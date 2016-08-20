var app = angular.module("GamesApp", []);
app.controller("GamesController", function($scope) {
	var game = {name:"",platform:""}
	$scope.game = game;
	$scope.displayGame = function(){
	 return $scope.game.name + " " + $scope.game.platform;	
}
});