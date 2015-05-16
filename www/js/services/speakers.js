angular.module('starter')

    .factory('SpeakersService', function ($localStorage, $http, apiEndpoint) {

        var speakers = $localStorage.speakers;

        return {
            getAllSpeakers: function () {
                if (speakers) {
                    console.log('Loading speakers from Cache');
                    return speakers;
                } else {

                    return $http.get(apiEndpoint.url + '?type=wcb_speaker&filter[posts_per_page]=-1').then(function (response) {
                        console.log('Speakers cache empty, retrieving from remote');
                        return response.data;
                    });
                }
            },
            refreshSpeakers: function () {
                return $http.get(apiEndpoint.url + '?type=wcb_speaker&filter[posts_per_page]=-1').then(function (response) {
                    console.log('So fresh, so clean');
                    return response.data;
                });
            }
        };

    });