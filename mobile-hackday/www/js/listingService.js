/**
 * Created by abhik.mitra on 08/08/14.
 */

angular.module('starter')
    .service('listingsFactory', ['$scope', '$firebase', function($scope, $firebase) {
        this.getListings = function(){
            return {
                "L1111" :{
                    price : 100,
                    image: "img.png"
                }
            }
        }

    }]);