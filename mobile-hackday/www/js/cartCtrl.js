/**
 * Created by abhik.mitra on 08/08/14.
 */
angular.module('starter')
.controller('cartCtrl', function ($scope, orderInCartFactory) {

    $scope.test = "hello"
    $scope.orderInCartFactory = orderInCartFactory;

})