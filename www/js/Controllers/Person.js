angular.module('starter.controllers', ['starter.services'])

.controller('PersonCtrl', function($scope, $location, $stateParams, $ionicPopup, $cordovaCamera, $cordovaFile, Database, Image) {

	(function(){
		$scope.debt = {name: '', debtvalue: 0.0, items: 0, datelastdebt: 'None', thumbnail: 'Localdaimgem'};
		$scope.items = [];
		$scope.item = {description: '', id: 0};
	})()

	$scope.addFromContact = function(){
		navigator.contacts.pickContact(function(contact){
			$scope.debt.name = contact.displayName.toString();
		},function(err){
			console.log('Error from getting conctact: ' + err);
		});
	}

	$scope.addDebt = function(){
		var debtPopup = $ionicPopup.show({
			template: '<input type="number" ng-model="debt.debtvalue">',
			title: 'Entre o valor da dívida',
			scope: $scope,
			buttons: [
			{ text: 'Cancelar' },
			{
				text: '<b>Salvar</b>',
				type: 'button-positive',
				onTap: function(e) {
					if (!$scope.debt.debtvalue) {
						e.preventDefault();
					} else {
						return $scope.debt.debtvalue;
					}
				}
			}
			]
		});
		debtPopup.then(function(res) {
			//console.log('Tapped!', res);
		});
	}

	$scope.addItem = function(){
		var itemPopup = $ionicPopup.show({
			templateUrl: "templates/popup/addItemNewUser.html",
			title: 'Adicione items',
			scope: $scope,
			buttons: [
			{ 
				text: 'Pronto'
			},
			{
				text: '<b>Salvar</b>',
				type: 'button-positive',
				onTap: function(e){
					if($scope.item.description){
						$scope.item.id = $scope.debt.items;
						$scope.items.push($scope.item);
						$scope.debt.items++;
						console.log($scope.debt.items);
						$scope.item = {description: '', id: 0};
					}
					e.preventDefault();
				}
			}
			]
		});
		itemPopup.then();
	}

	$scope.addImageLibrary = function(){
		var options = {
			destinationType : Camera.DestinationType.FILE_URI,
			sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
			allowEdit : false,
			encodingType: Camera.EncodingType.JPEG,
 			//targetWidth: .
 			//targetHeight:
 			mediaType: Camera.MediaType.PICTURE, 
 		};
 		$cordovaCamera.getPicture(options).then(function(imageData){
 			onImageSuccess(imageData);
 		}, function(err) { console.log(err);} );
 	};

 	$scope.addImageCamera = function(){
 		var options = {
 			destinationType : Camera.DestinationType.FILE_URI,
 			sourceType : Camera.PictureSourceType.CAMERA,
 			allowEdit : false,
 			encodingType: Camera.EncodingType.JPEG,
 			//targetWidth: .
 			//targetHeight:
 			popoverOptions: CameraPopoverOptions, 
 		};		
 	};

 	$scope.save = function(){
 		if($scope.debt.name.length === 0 || /^\s*$/.test($scope.debt.name)){
 			$scope.showAlert(1);
 		}else{
 			if(Database.save($scope.debt)){
 				if($scope.items.length > 0){
 					if(!Database.saveItems($scope.items)){
 						Database.deleteDebt($scope.debt);
 						$scope.showAlert(3)
 					}
 				}
 				$location.path("/");
 			}else{$scope.showAlert(2);}
 		}
 	};

 	$scope.showAlert = function(code){
 		var alertPopup;
 		if(code === 1){
	 		alertPopup = $ionicPopup.alert({
	 			title: 'Alerta',
	 			template: 'O Nome está vazio',
	 			//cssClass: 'alertError'
	 		});
 		}
 		else if(code === 2){
 			alertPopup = $ionicPopup.alert({
 				title: 'Erro',
 				template: 'Houve problemas ao salvar o Devedor, tente denovo mais tarde',
 				//cssClass: 'alertError'
 			});
 			alertPopup.then(function(res){
 				$location.path("/");
 			}); 					
 		}
 		else if(code === 3){
 			alertPopup = $ionicPopup.alert({
 				title: 'Erro',
 				template: 'Houve problemas ao salvar os items, tente denovo mais tarde',
 				//cssClass: 'alertError'
 			}); 					
 			alertPopup.then(function(res){
 				$location.path("/");
 			}); 					
 		}
 	};

 	function onImageSuccess(fileURI) {
 		window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
 	};

 	function copyFile(fileEntry) {
 		var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
 		var tmp = CryptoJS.SHA1(name).toString();
 		var newName = tmp.substr(0,8) + ".jpg";

 		window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
 			fileEntry.copyTo(
 				fileSystem2,
 				newName,
 				onCopySuccess,
 				fail
 				);
 		}, fail);
 	};

 	function onCopySuccess(entry) {
 		$scope.$apply(function () {
 			debt['thumbnail'] = entry.nativeURL;
 			$scope.thumbnail = Image.urlForImage(entry.nativeURL);
 		});
 	};

 	function fail(error) {
 		console.log("fail: " + error.code);
 	};
 });