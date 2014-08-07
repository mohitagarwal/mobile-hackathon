/**
 * Created by abhik.mitra on 08/08/14.
 */

angular.module('starter')
    .service('listingsFactory', ['$scope', '$firebase','$q', function($scope, $firebase, $q) {
        var ref = new Firebase("https://luminous-fire-8360.firebaseio.com/");
        var listingsRef = ref.child("listings");
        var sync = $firebase(listingsRef);
        var listings = sync.$asObject();
        var deferred = $q.defer;
        listings.$loaded().then(function() {

            deferred.resolve();
        });
        this.getListingsForCustomer = function(){
            return deferred;
            return {
                "L1111" :{
                    price : 100,
                    image: "img.png",
                    name: "Sabzi"
                }
            }
        }

    }]);