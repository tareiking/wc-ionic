angular.module('starter.controllers', [])
    .constant('apiEndpoint', {
        'url': 'http://brisbane.wordcamp.org/2015/wp-json/posts/'
    })
    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    })

    .controller('SpeakersCtrl', function ($scope, $stateParams, $http, apiEndpoint, $ionicLoading, $localStorage) {

        // Let used cached data
        var cached = $localStorage.speakers;
        if (cached) {
            console.log('speakers loaded cache')
            $scope.posts = cached;
            $ionicLoading.hide()
        }
        else {
            // Indicate we are loading something
            $ionicLoading.show({
                template: 'getting fresh data...',
                noBackdrop: true,
                delay: 1,
            })

            // Run and get data
            $http.get(apiEndpoint.url + '?type=wcb_speaker&filter[posts_per_page]=-1').
                success(function (data, status, headers, config) {

                    $scope.posts = data;
                    $localStorage.speakers = data;

                    $ionicLoading.hide()

                }).
                error(function (data, status, headers, config) {
                    // log error
                });
        }

        $scope.doRefresh = function () {
            $http.get(apiEndpoint.url + '?type=wcb_speaker&filter[posts_per_page]=-1').
                success(function (data) {
                    $scope.posts = data;
                    $localStorage.speakers = data;
                    console.log('new speakers list loaded from remote');
                })
                .finally(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                });
        }

    })

    .controller('SpeakerCtrl', function ($scope, $stateParams, $http, apiEndpoint, $ionicLoading) {

        $ionicLoading.show({
            template: 'Retrieving speaker awesomeness',
            template: '<button ng-click="handleClick()"></button>',
            noBackdrop: true,
            delay: 2,
            duration: 15,

        })

        $http.get(apiEndpoint.url + $stateParams.id).
            success(function (data, status, headers, config) {
                $scope.speaker = data;
                $ionicLoading.hide()

                $avatar = $scope.speaker.avatar;

                if (!$avatar) {
                    $avatar = "img/placeholder.png";
                }
                ;

                $scope.speaker.avatar = $avatar.replace('?s=96', '?s=256');

            }).
            error(function (data, status, headers, config) {
                // log error
            })
    })

    .controller('DetailCtrl', function ($scope, $stateParams, $http, apiEndpoint) {
        $http.get(apiEndpoint.url + $stateParams.id).
            success(function (data, status, headers, config) {
                $scope.post = data;
            }).
            error(function (data, status, headers, config) {
                // log error
            });
    })

    .controller('SponsorsCtrl', function ($scope, $stateParams, $http, apiEndpoint) {
        $http.get(apiEndpoint.url + '?type=wcb_sponsor').
            success(function (data, status, headers, config) {
                $scope.posts = data;
            }).
            error(function (data, status, headers, config) {
                // log error
            });
    })


    .controller('SessionCtrl', function ($scope, $stateParams, $http, apiEndpoint, $filter) {

        $http.get(apiEndpoint.url + '?type=wcb_session&filter[posts_per_page]=-1').
            success(function (data, status, headers, config) {
                $scope.posts = data;
            }).
            error(function (data, status, headers, config) {
                // log error
            });
    })

    .controller('VenueCtrl', function ($scope, $stateParams, $http, apiEndpoint) {
        $http.get('https://central.wordcamp.org/wp-json/posts/3038603').
            success(function (data, status, headers, config) {
                $scope.post = data;
            }).
            error(function (data, status, headers, config) {
                // log error
            });
    })

    .controller('HomeCtrl', function ($scope, $stateParams, $http, $window, $ionicSlideBoxDelegate) {

        // Redirect to home controller
        $scope.goHome = function(){
            $window.location.href = '#/app/home';
        }
        $http.get('https://central.wordcamp.org/wp-json/posts?type=wordcamp').
            success(function (data, status, headers, config) {
                $scope.posts = data;
                $ionicSlideBoxDelegate.update();
            }).
            error(function (data, status, headers, config) {
                // log error
            });
    })

    .controller('WordCampCtrl', function ($scope, $stateParams, $http, $ionicSlideBoxDelegate) {
        $http.get('https://central.wordcamp.org/wp-json/posts/' + $stateParams.id).
            success(function (data, status, headers, config) {
                $scope.wordcamp = data;
                $scope.meta = data.post_meta;

            }).
            error(function (data, status, headers, config) {
                // log error
            });
    })

;

