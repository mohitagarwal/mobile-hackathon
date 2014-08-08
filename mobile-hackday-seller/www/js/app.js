angular.module('starter', ['ionic', 'openfb',"firebase"])

    .run(function ($rootScope, $state, $ionicPlatform, $window, OpenFB, orderService) {

        orderService.setSellerid(12345);
        OpenFB.init('705646602842147');
//        orderService.getPossibleOrders();
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








