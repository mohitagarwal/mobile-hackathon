/**
 * Created by abhik.mitra on 08/08/14.
 */

angular.module('starter')
    .service('listingsFactory', [ '$firebase','$q', function( $firebase, $q) {
        var ref = new Firebase("https://luminous-fire-8360.firebaseio.com/");
        var listingsRef = ref.child("Listings");
        var sync = $firebase(listingsRef);
        var listings = sync.$asObject();
        var deferred = $q.defer();
        listings.$loaded().then(function(data) {
            var arr = {};
            _.each(data, function(data,key){
                if(key.indexOf("$") === -1){
                    arr[key] = data;
                }

            });
            deferred.resolve(arr);
        });
        this.getListingsForCustomer = function(){
            return deferred.promise;
        }

    }]);