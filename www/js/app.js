// Ionic Starter App

var db;

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, Database) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    //Database.open("database.db"); 
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  // setup an abstract state for the screens
    .state('menu', {
    url: "/menu",
    abstract: true,
    templateUrl: "templates/menu.html"
  })

    .state('menu-2', {
    url: "/menu-2",
    abstract: true,
    templateUrl: "templates/menu-person.html"
  })

  .state('index', {
    url: '/',
    templateUrl: 'templates/home.html'
  })

  //create person
  .state('menu-2.debtCreatePerson', {
    url: '/createPerson',
    views: {
      'menuContent': {
        templateUrl: 'templates/createPerson.html',
        controller: 'PersonCtrl'
      }
    }
  })

  .state('menu.debts', {
    url: '/debts',
    views: {
      'menuContent': {
        templateUrl: 'templates/debts.html',
        controller: 'DebtsCtrl'
      }
    }
  })

  //debtalone
  .state('menu.debt', {
    url: '/debt/:id',
    views: {
      'menuContent': {
        templateUrl: "templates/debt.html",
        controller: 'DebtCtrl'
      }
    }
  })

  .state('menu.debtnew', {
    url: '/debt/:id/:new',
    views: {
      'menuContent': {
        templateUrl: "templates/debtNew.html",
        controller: 'DebtCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});