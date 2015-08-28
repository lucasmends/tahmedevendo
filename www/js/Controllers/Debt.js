angular.module('starter.controllers', ['starter.services'])


.controller('DebtCtrl', function($scope, $stateParams, $ionicPopover, Database){

	(function(){
		if("id" in $stateParams){
			$scope.debt = Database.find($stateParams.id);
		}else{
			$scope.debts = Database.all();
		}
	})()

	$ionicPopover.fromTemplateUrl('my-popover.html', {
		scope: $scope
	}).then(function(popover) {
		$scope.popover = popover;
	});
})