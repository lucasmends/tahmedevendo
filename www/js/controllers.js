angular.module('starter.controllers', ['starter.services'])

.controller('DebtsCtrl', function($scope, $stateParams, $ionicPopover, Image, Database){

	(function() {  // init
		//$scope.debts = Database.all(db);
	})()

	$scope.thumbnail = function(name){
		return Image.urlForImage(name);
	}

	$ionicPopover.fromTemplateUrl('my-popover.html', {
		scope: $scope
	}).then(function(popover) {
		$scope.popover = popover;
	});



})



