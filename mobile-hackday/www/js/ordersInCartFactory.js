/**
 * Created by abhik.mitra on 08/08/14.
 */
/**
 * Created by abhik.mitra on 08/08/14.
 */
/**
 * Created by abhik.mitra on 07/08/14.
 */

angular.module('starter')
    .service('orderInCartFactory', ['$firebase', function($firebase) {
        this.cart = [];
        this.addToCart = function(listing, quantity){
            var item = _.find(this.cart, function(item){
                return item.listing.id === listing.id;
            });
            if(item){
               item.quantity += quantity;
               item.price += quantity * listing.price;
            } else {
                this.cart.push({
                    listing:listing,
                    quantity: quantity,
                    price: quantity * listing.price
                });
            }
        };
        this.getCart = function(){
            return this.cart;
        }

    }])
;