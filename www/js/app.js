// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.filter('split', function() {
  return function(input, splitChar, splitIndex) {
      // do some bounds checking here to ensure it has that index
      return input.split(splitChar)[splitIndex];
  }
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.speakers', {
    url: "/speakers",
    views: {
      'menuContent': {
        templateUrl: "templates/speakers.html",
        controller: 'SpeakersCtrl'
      }
    }
  })

  .state('app.speaker', {
    url: "/speaker/:id",
    views: {
      'menuContent': {
        templateUrl: "templates/speaker.html",
        controller: 'SpeakerCtrl'
      }
    }
  })

  .state('app.sessions', {
    url: "/sessions",
    views: {
      'menuContent': {
        templateUrl: "templates/sessions.html",
        controller: 'SessionCtrl'
      }
    }
  })
    .state('app.venue', {
      url: "/venue",
      views: {
        'menuContent': {
          templateUrl: "templates/venue.html",
          controller: 'VenueCtrl'
        }
      }
    })

    .state('app.sponsors', {
      url: "/sponsors",
      views: {
        'menuContent': {
          templateUrl: "templates/sponsors.html",
          controller: 'SponsorsCtrl'
        }
      }
    })

  .state('app.detail', {
    url: "/detail/:id",
    views: {
      'menuContent': {
        templateUrl: "templates/detail.html",
        controller: 'DetailCtrl'
      }
    }
  })

  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/home.html",
        controller: 'HomeCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
