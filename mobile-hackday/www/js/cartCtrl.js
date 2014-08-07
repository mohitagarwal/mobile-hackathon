/**
 * Created by abhik.mitra on 08/08/14.
 */
angular.module('starter')
.controller('cartCtrl', function ($scope, orderInCartFactory,sellersFactory) {

    $scope.test = "hello"
    $scope.orderInCartFactory = orderInCartFactory;
    $scope.sellersFactory = sellersFactory;
    $scope.confirmOrder = function(){

    };

})