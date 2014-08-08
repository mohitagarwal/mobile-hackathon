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

    .controller('LoginCtrl', function ($scope, $location, OpenFB, sellersFactory, geolocation) {

        $scope.facebookLogin = function () {

            OpenFB.login('email,read_stream,publish_stream').then(
                function () {
                    OpenFB.get('/me').success(function (user) {
                        $scope.user = user;

                        geolocation.getLocation().then(function (data) {
                            $scope.coords = {lat: data.coords.latitude, long: data.coords.longitude};

                            sellersFactory.addSeller($scope.user.name, false, $scope.coords.lat, $scope.coords.long);

                            $location.path('/app/listings');
                        });

                    });
                },
                function () {
                    alert('OpenFB login failed');
                });
        };

    })

    .controller('ListingsCtrl', function ($scope, $state, OpenFB, listingsFactory, $ionicModal, orderInCartFactory, $ionicPopup) {

        OpenFB.get('/me').success(function (user) {
            $scope.user = user;
        });

        var promise = listingsFactory.getListingsForCustomer();
        $scope.listings = [];
        var index = 0;
        promise.then(function (data) {
            _.each(data, function (data, key) {
                $scope.listings[index] = data;
                index++;

            })

        });

        $ionicModal.fromTemplateUrl('templates/place_order.html', function (modal) {
            $scope.placeOrder = modal;
        }, {
            scope: $scope
        })
        $scope.veg = {};
        $scope.veg.quantity = 1;

        $scope.chooseItem = function(chosenItem){
            $scope.item = chosenItem;
            $scope.showPlaceOrder();
        }

        $scope.showPlaceOrder = function(){
            $scope.placeOrder.show();
        }

        $scope.hidePlaceOrder = function(){
            $scope.placeOrder.hide();
        }

        $scope.addToCart = function (){
            orderInCartFactory.addToCart($scope.item, $scope.veg.quantity);
            console.log(orderInCartFactory.getCart());
            $scope.hidePlaceOrder();
        }

        $scope.checkout = function(){
            $state.go('app.cart');
        }




//        geolocation.getLocation().then(function (data){
//            $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
//            console.log(data.coords.latitude);
//        });

//        $scope.item = {};
//
//        $scope.share = function () {
//            OpenFB.post('/me/feed', $scope.item)
//                .success(function () {
//                    $scope.status = "This item has been shared on OpenFB";
//                })
//                .error(function(data) {
//                    alert(data.error.message);
//                });
//        };

    })

    .controller('ProfileCtrl', function ($scope, OpenFB, geolocation) {
        OpenFB.get('/me').success(function (user) {
            $scope.user = user;
        });

        geolocation.getLocation().then(function (data) {
            $scope.coords = {lat: data.coords.latitude, long: data.coords.longitude};
            console.log(data.coords.latitude);
        });
    })

    .controller('PersonCtrl', function ($scope, $stateParams, OpenFB) {
        OpenFB.get('/' + $stateParams.personId).success(function (user) {
            $scope.user = user;
        });
    })

    .controller('FriendsCtrl', function ($scope, $stateParams, OpenFB) {
        OpenFB.get('/' + $stateParams.personId + '/friends', {limit: 50})
            .success(function (result) {
                $scope.friends = result.data;
            })
            .error(function (data) {
                alert(data.error.message);
            });
    })

    .controller('MutualFriendsCtrl', function ($scope, $stateParams, OpenFB) {
        OpenFB.get('/' + $stateParams.personId + '/mutualfriends', {limit: 50})
            .success(function (result) {
                $scope.friends = result.data;
            })
            .error(function (data) {
                alert(data.error.message);
            });
    })

    .controller('FeedCtrl', function ($scope, $stateParams, OpenFB, $ionicLoading) {

        $scope.show = function () {
            $scope.loading = $ionicLoading.show({
                content: 'Loading feed...'
            });
        };
        $scope.hide = function () {
            $scope.loading.hide();
        };

        function loadFeed() {
            $scope.show();
            OpenFB.get('/' + $stateParams.personId + '/home', {limit: 30})
                .success(function (result) {
                    $scope.hide();
                    $scope.items = result.data;
                    // Used with pull-to-refresh
                    $scope.$broadcast('scroll.refreshComplete');
                })
                .error(function (data) {
                    $scope.hide();
                    alert(data.error.message);
                });
        }

        $scope.doRefresh = loadFeed;

        loadFeed();

    });