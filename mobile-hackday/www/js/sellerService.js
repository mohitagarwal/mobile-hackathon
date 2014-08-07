/**
 * Created by abhik.mitra on 08/08/14.
 */
/**
 * Created by abhik.mitra on 07/08/14.
 */
angular.module('starter')
    .service('sellersFactory', ['$scope', '$firebase', function($scope, $firebase) {
        $scope.sellerDetails = "Seller";
        var ref = new Firebase("https://luminous-fire-8360.firebaseio.com/");
        var sellersRef = ref.child("sellers");
        var sync = $firebase(sellersRef);
        var sellers = sync.$asObject();
        var self = this;
        this.currentLocation = {
            latitude:0,
            longitude:0
        }
        sellers.$loaded().then(function() {

        });
        function calculateSellerDistance(){
            _.each(sellers, function(seller,key){
                if(key.indexOf("$") === -1){
                    calculateDistanceFromCurrent({
                        latitude: seller.latitude,
                        longitude: seller.longitude
                    },self.currentLocation);
                }

            });
        }
        function calculateDistanceFromCurrent(from,to){
            var distance =Math.sqrt( Math.pow((from.latitude-to.latitude),2) + Math.pow((from.longitude-to.longitude),2));


        }
        this.addSeller = function (name,isSeller,latitude,longitude){
            sellersRef.child(name).set({
                isSeller: true,
                latitude: latitude,
                longitude: longitude
            });
            self.currentLocation = {
                latitude: latitude,
                longitude: longitude
            }
            calculateSellerDistance();

        };

    }]);