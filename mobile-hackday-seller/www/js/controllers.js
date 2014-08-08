angular.module('starter')

    .controller('placedOrdersCtrl', function ($scope,orderService) {

        $scope.orderService = orderService;

    })
    .controller('yourOrdersCtrl', function ($scope,orderService) {

        $scope.orderService = orderService;

    });