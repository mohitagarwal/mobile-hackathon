angular.module('starter')

    .controller('AppCtrl', function ($scope, $state, OpenFB) {

        $scope.logout = function () {
            OpenFB.logout();
            $state.go('app.login');
        };

        $scope.revokePermissions = function () {
            OpenFB.revokePermissions().then(
                function () {
                    $state.go('app.login');
                },
                function () {
                    alert('Revoke permissions failed');
                });
        };

    })

    .controller('LoginCtrl', function ($scope, $location, OpenFB) {

        $scope.facebookLogin = function () {

//            OpenFB.login('email,read_stream,publish_stream').then(
//                function () {
//                    OpenFB.get('/me').success(function (user) {
//                        $scope.user = user;
            $location.path('/app/orders');
//                    });
//                },
//                function () {
//                    alert('OpenFB login failed');
//                });
        };

    })

    .controller('OrdersCtrl', function () {

    })

    .controller('LogoutCtrl', function ($scope, $location, OpenFB) {


    })

    .controller('ListingsCtrl', function ($scope, $state, OpenFB, $ionicModal, $ionicPopup) {

//        OpenFB.get('/me').success(function (user) {
//            $scope.user = user;
//        });
//
//        var promise = listingsFactory.getListingsForCustomer();
//        $scope.listings = [];
//        var index = 0;
//        promise.then(function (data) {
//            _.each(data, function (data, key) {
//                $scope.listings[index] = data;
//                index++;
//
//            })
//
//        });
//
//        $ionicModal.fromTemplateUrl('templates/place_order.html', function (modal) {
//            $scope.placeOrder = modal;
//        }, {
//            scope: $scope
//        });
//        $scope.veg = {};
//        $scope.veg.quantity = 1;
//
//        $scope.chooseItem = function(chosenItem){
//            $scope.item = chosenItem;
//            $scope.showPlaceOrder();
//        }
//
//        $scope.showPlaceOrder = function(){
//            $scope.placeOrder.show();
//        }
//
//        $scope.hidePlaceOrder = function(){
//            $scope.placeOrder.hide();
//        }
//
//        $scope.addToCart = function (){
//            orderInCartFactory.addToCart($scope.item, $scope.veg.quantity);
//            console.log(orderInCartFactory.getCart());
//            $scope.hidePlaceOrder();
//        }
//
//        $scope.checkout = function(){
//            $state.go('app.cart');
//        }

    });