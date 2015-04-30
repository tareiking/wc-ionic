angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

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

