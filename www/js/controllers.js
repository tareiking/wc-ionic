angular.module('starter.controllers', [])
.constant('apiEndpoint', {
    'url': 'http://brisbane.wordcamp.org/2015/wp-json/posts/'
})
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {})

.controller('SpeakersCtrl', function($scope, $stateParams, $http, apiEndpoint) {

  $http.get( apiEndpoint.url + '?type=wcb_speaker').
    success(function(data, status, headers, config) {
      $scope.posts = data;

    }).
    error(function(data, status, headers, config) {
      // log error
    });
})

.controller('SpeakerCtrl', function($scope, $stateParams, $http, apiEndpoint) {
  $http.get( apiEndpoint.url + $stateParams.id).
    success(function(data, status, headers, config) {
      $scope.speaker = data;

      $avatar = $scope.speaker.avatar;

      if ( ! $avatar ) {
        $avatar = "img/placeholder.png";
      };

      $scope.speaker.avatar = $avatar.replace( '?s=96', '?s=256');

    }).
    error(function(data, status, headers, config) {
      // log error
    })
})

.controller('DetailCtrl', function($scope, $stateParams, $http, apiEndpoint) {
  $http.get( apiEndpoint.url  + $stateParams.id).
    success(function(data, status, headers, config) {
      $scope.post = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
})

.controller('SponsorsCtrl', function($scope, $stateParams, $http, apiEndpoint) {
  $http.get( apiEndpoint.url + '?type=wcb_sponsor').
    success(function(data, status, headers, config) {
      $scope.posts = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
})


.controller('SessionCtrl', function($scope, $stateParams, $http, apiEndpoint) {
  $http.get( apiEndpoint.url + '?type=wcb_session').
    success(function(data, status, headers, config) {
      $scope.posts = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
})

.controller('VenueCtrl', function($scope, $stateParams, $http, apiEndpoint) {

  $scope.data = {
    "title":"Venue",
  };
})

;

