angular.module('starter.services', ['ngCordova'])

.factory('Database', function(){
	return {
		open: function(){
			db = window.sqlitePlugin.openDatabase({name: "database.db"});
			db.transaction(function(tx) {
    			tx.executeSql('CREATE TABLE IF NOT EXISTS person (id integer primary key, name text, thumbnail text, debtvalue real, items integer, datelastdebt text, created text)');
    			tx.executeSql('CREATE TABLE IF NOT EXISTS item (id integer primary key, idperson integer, description text)');
			});
		},
		all: function(){
			var query = "SELECT id, name, thumbnail, debtvalue, items, datelastdebt FROM person";
			var all = [];
        	db.transaction(function(tx){
        		tx.executeSql(query, [], function(tx, res){
        			for (var i = 0; i < res.rows.length; i++) {
						var debt = {}
						var name = res.rows.item(i).thumbnail.substr(imageName.lastIndexOf('/') + 1);
						var trueOrigin = cordova.file.dataDirectory + name;

        				debt['id'] = res.rows.item(i).id;
        				debt['name'] = res.rows.item(i).name;
        				debt['thumbnail'] = trueOrigin;
        				debt['debtvalue'] = res.rows.item(i).debtvalue;
        				debt['items'] = res.rows.item(i).items;
        				debt['datelastdebt'] = res.rows.item(i).datelastdebt;
        				all.push(debt);
        			};
        		});
        	});
        	return all;
		},
		searchDebt: function(name){

		},
		searchItem: function(){

		},
		save: function(debt){
			return false;
		},
		saveItems: function(items){
			return true;
		},
		deleteDebt: function(debt){

		}
	}
})

.factory('Image', function(){
	return {
		urlForImage: function(imageName){
			var name = imageName.substr(imageName.lastIndexOf('/') + 1);
			var trueOrigin = cordova.file.dataDirectory + name;
	 		return trueOrigin;	
	 	}
	}
})
