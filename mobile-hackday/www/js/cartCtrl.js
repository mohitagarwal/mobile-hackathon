/**
 * Created by abhik.mitra on 08/08/14.
 */
angular.module('starter')
.controller('cartCtrl', function ($scope, orderInCartFactory,sellersFactory, checkoutFactory, $http, $q, $state) {

    $scope.test = "hello";
    $scope.orderInCartFactory = orderInCartFactory;
    $scope.sellersFactory = sellersFactory;
    $scope.confirmOrder = function(){
        var json = checkoutFactory.generateJSON();
        var deferred = $q.defer();
        json.then(function(data){
            var promise = $http({
                url:'http://172.17.91.172:8080/myapp/rest/order',
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data:data
            });
            promise.success(function(data){
                deferred.resolve(data);
                console.log("Successfully Placed", data);
                checkoutFactory.orderId = data.orderId;
                $state.go('app.track_order');
            });
            promise.error(function(error){
                deferred.reject(error);
                console.log("Error while placing order");
            });
        });
        return deferred.promise;

    }
})