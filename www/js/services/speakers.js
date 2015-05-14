'use strict';
angular.module('starter')

.service('SpeakersService', function($localStorage, $http, apiEndpoint) {

  var speakers = $localStorage.speakers;

  return {
      getAllSpeakers: function() {
        if ( speakers ) {
          return speakers;
        } else {

          $http.get(apiEndpoint.url + '?type=wcb_speaker&filter[posts_per_page]=-1')
            .success(function (data, status, headers, config) {

              $localStorage.speakers = data; // cache it

              return data;

            }).error(function (data, status, headers, config) {
            });
          }
      },
  }

});