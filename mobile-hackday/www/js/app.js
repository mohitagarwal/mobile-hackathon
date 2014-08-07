angular.module('starter', ['ionic', 'openfb', 'starter.controllers'])

    .run(function ($rootScope, $state, $ionicPlatform, $window, OpenFB) {

        OpenFB.init('424561861018882');

        $ionicPlatform.ready(function () {
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });

        $rootScope.$on('$stateChangeStart', function(event, toState) {
            if (toState.name !== "app.login" && toState.name !== "app.logout" && !$window.sessionStorage['fbtoken']) {
                $state.go('app.login');
                event.preventDefault();
            }
        });

        $rootScope.$on('OAuthException', function() {
            $state.go('app.login');
        });

    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: "AppCtrl"
            })

            .state('app.login', {
                url: "/login",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login.html",
                        controller: "LoginCtrl"
                    }
                }
            })

            .state('app.logout', {
                url: "/logout",
                views: {
                    'menuContent': {
                        templateUrl: "templates/logout.html",
                        controller: "LogoutCtrl"
                    }
                }
            })

            .state('app.listings', {
                url: "/listings",
                views: {
                    'menuContent': {
                        templateUrl: "templates/listings.html",
                        controller: "ListingsCtrl"
                    }
                }
            })

            .state('app.profile', {
                url: "/profile",
                views: {
                    'menuContent': {
                        templateUrl: "templates/profile.html",
                        controller: "ProfileCtrl"
                    }
                }
            });

        // fallback route
        $urlRouterProvider.otherwise('/app/login');

    });

