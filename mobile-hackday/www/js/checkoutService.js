/**
 * Created by abhik.mitra on 08/08/14.
 */
angular.module('starter')
    .service('checkoutFactory', ['$firebase', 'sellersFactory', 'OpenFB', 'orderInCartFactory', '$q', function ($firebase, sellerService, OpenFB, orderInCartFactory, $q) {
        var sellerId = "";
        var probableSellers = sellerService.probableSellers;
        var customerId = "";

        var orderId = "";
;
        var customerAddress = {
            addressLine: "Flipkart.com, VS, Koramangala 1st Block",
            city: "Bangalore",
            pincode: "560034"
        };

        var billingPrice = orderInCartFactory.getTotalCartValue();
        var cart = orderInCartFactory.getCart();
        var orderItems = [];

        _.each(cart, function(cart,key){
            var item = {
                productId : cart.listing.id,
                quantity : cart.quantity,
                price : cart.price
            }
            orderItems.push(item);
        });

        var generateJSON = function(){
            var deferred = $q.defer();

            var promise = OpenFB.get('/me');
            promise.success(function (user) {
                customerId = user.name;
                var jsonData = {
                    sellerId : sellerId,
                    probableSellers : probableSellers,
                    customerId : customerId,
                    customerAddress : customerAddress,
                    billingPrice : billingPrice,
                    orderItems : orderItems
                }
                console.log(jsonData);

                deferred.resolve(jsonData);

            });
            return deferred.promise;
        }

        return {
            generateJSON: generateJSON
        }





    }])
;