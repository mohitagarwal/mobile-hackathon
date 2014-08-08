angular.module('starter')

    .controller('placedOrdersCtrl', function ($scope,orderService) {

        $scope.orderService = orderService;

    });