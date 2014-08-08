/**
 * Created by abhik.mitra on 08/08/14.
 */
angular.module('starter')
.controller('cartCtrl', function ($scope, orderInCartFactory,sellersFactory, checkoutFactory, $http, $q) {

    $scope.test = "hello"
    $scope.orderInCartFactory = orderInCartFactory;
    $scope.sellersFactory = sellersFactory;
    $scope.confirmOrder = function(){
        var json = checkoutFactory.generateJSON();

        var deferred = $q.defer();
        var promise = $http({
            url:'http://172.17.89.106:8080/myapp/rest/order',
            method:'POST',
            data:json
        });
        promise.success(function(data){
            deferred.resolve(data);
            console.log("Successfully Placed");
        });
        promise.error(function(error){
            deferred.reject(error);
            console.log("Error while placing order");
        });

        return deferred.resolve;

    };

})