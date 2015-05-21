angular.module('starter.controllers', [])
    .constant('apiEndpoint', {
        'url': 'http://brisbane.wordcamp.org/2015/wp-json/posts/'
    })
    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    })

    .controller('SpeakersCtrl', function ($scope, $stateParams, SpeakersService) {

        $scope.speakers = SpeakersService.getAllSpeakers()

        $scope.refreshSpeakers = function () {
            SpeakersService.refreshSpeakers().then(function (results) {
                $scope.speakers = results;
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

    })

    .controller('SpeakerCtrl', function ($scope, $stateParams, $http, $ionicLoading, SpeakersService) {

        $ionicLoading.show({
            template: '<ion-spinner icon="crescent"></ion-spinner><p>Refreshing speaker details</p>',
            noBackdrop: false,
            delay: 300,
            duration: 15000,
        })

        SpeakersService.getSingleSpeaker( $stateParams.id ).then(function (results) {
            $scope.speaker = results;
            console.log ( results );
            var avatar = $scope.speaker.avatar;

            if (!avatar) {
                avatar = "img/placeholder.png";
            }

            $scope.speaker.avatar = avatar.replace('?s=96', '?s=256');

            $ionicLoading.hide();
        });
    })

    .controller('DetailCtrl', function ($scope, $stateParams, SpeakersService, $ionicLoading) {
        $ionicLoading.show({
            template: '<ion-spinner icon="crescent"></ion-spinner><p>Getting session information</p>',
            noBackdrop: false,
            delay: 300,
            duration: 15000,
        })

        SpeakersService.getSingleSpeaker( $stateParams.id ).then(function (results) {
            $scope.post = results;

            $ionicLoading.hide();
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


    .controller('SessionCtrl', function ($scope, $stateParams, $http, apiEndpoint, $filter, $ionicLoading, $localStorage) {

        // Let used cached data
        var cached = $localStorage.sessions;

        if (cached) {
            console.log('Sessions loaded from cache')
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
            $http.get(apiEndpoint.url + '?type=wcb_session&filter[posts_per_page]=-1').
                success(function (data, status, headers, config) {

                    $scope.posts = data;
                    $localStorage.sessions = data;

                    $ionicLoading.hide()

                }).
                error(function (data, status, headers, config) {
                    // log error
                });
        }

        $scope.doRefresh = function () {
            $http.get(apiEndpoint.url + '?type=wcb_session&filter[posts_per_page]=-1').
                success(function (data) {
                    $scope.posts = data;
                    $localStorage.sessions = data;
                    console.log('new session list loaded from remote');
                })
                .finally(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
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
        $scope.goHome = function () {
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

    .controller('FavoritesCtrl', function ($scope, $stateParams, $localStorage, SpeakersService) {

        var favs = $localStorage.favorites || [];
        $scope.listCanSwipe = true;
        $scope.addToFavorites = function () {

            SpeakersService.getSingleSpeaker( $stateParams.id ).then(function (results) {

                var favorite = {
                    'title': results.title,
                    'id': results.ID,
                    'time': results.post_meta[0].value,
                    'speaker': results.speaker.title,
                    'speaker_id': results.speaker.ID
                };

                if ( favs.length === 0 ) {
                    favs.push( favorite );
                } else {
                    // if favorite isn't already added
                    var all_ids = [];
                    for ( var i = 0; i < favs.length; i++ ) {
                        all_ids.push(favs[i].id);
                    }

                    if (  all_ids.indexOf( parseInt( $stateParams.id ) ) === -1 ) {
                        favs.push( favorite );
                        console.log( 'fav added' );
                    }

                }

                $localStorage.favorites = favs;

            });

        }

        $scope.favs = favs;
    })

;

