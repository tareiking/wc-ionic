angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {})

.controller('SpeakersCtrl', function($scope, $stateParams, $http) {

  // Avatar
  // http://uifaces.com/api/v1/random/
  $http.get('http://uifaces.com/api/v1/random/').
    success(function(data, status, headers, config) {
      $scope.speaker = data.image_urls;
    }).
    error(function(data, status, headers, config) {
      $scope.speaker = 'img/ionic.png';
    });

  $http.get('http://brisbane.wordcamp.org/2015/wp-json/posts?type=wcb_speaker').
    success(function(data, status, headers, config) {
      $scope.posts = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
})

.controller('SpeakerCtrl', function($scope, $stateParams, $http) {
  $http.get('http://brisbane.wordcamp.org/2015/wp-json/posts/' + $stateParams.id).
    success(function(data, status, headers, config) {
      $scope.speaker = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
})

.controller('DetailCtrl', function($scope, $stateParams, $http) {
  $http.get('http://brisbane.wordcamp.org/2015/wp-json/posts/' + $stateParams.id).
    success(function(data, status, headers, config) {
      $scope.post = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
})


.controller('SessionCtrl', function($scope, $stateParams, $http) {
  $http.get('http://brisbane.wordcamp.org/2015/wp-json/posts?type=wcb_session').
    success(function(data, status, headers, config) {
      $scope.posts = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
})

.controller('VenueCtrl', function($scope, $stateParams, $http) {

  $scope.data = {
    "title":"Venue",
  };
})

;

