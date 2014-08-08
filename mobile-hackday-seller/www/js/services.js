angular.module('starter')

/**
 * A simple example service that returns some data.
 */
.service('orderService', function($firebase,$interval,$http,$q) {
        var ref = new Firebase("https://luminous-fire-8360.firebaseio.com/");
        var ordersRef = ref.child("orders");
        var listingsref = ref.child("Listings");
        var sync = $firebase(ordersRef);
        var syncListings = $firebase(listingsref);
        var listings =  syncListings.$asObject();
        var orders = sync.$asArray();
        var allOrdersArr = [];
        var self = this;
        this.sellerId = "";
        this.setSellerid = function(sellerId){
            this.sellerId = sellerId;
        };
        $q.all(orders.$loaded(),listings.$loaded()).then(
           function(){
               onOrdersChanged();
               orders.$watch(function(){
                   onOrdersChanged();
               });
           }
        )

        function onOrdersChanged(){
            allOrdersArr = [];
            _.each(orders, function(orderObj,key){

//                if(key.indexOf("$") === -1){
                    var order = {

                    };

                _.each(orderObj,function(orderData,orderId){

                        if(orderId.indexOf("$") === -1){

                            order.orderId = orderId;
                            _.extend(order,orderData);
                        }

                    });
                    //enriching the array
                    _.each(order.orderItems,function(orderitems){
                        orderitems.listing = listings[orderitems.productId];
                    });
                    allOrdersArr.push(order);
//                /}

            });
            console.log(allOrdersArr);


        };
        this.getPossibleOrders = function(){
            return _.filter(allOrdersArr, function(item){
                return item.sellerId === "";
            });
        };
        this.confirmOrder = function(order){
            order.sellerId = this.sellerId;
            orders.$save(order);
        }
        this.getOrdersConfirmedBySeller = function(orders){
                return _.find(allOrdersArr,function(order){
                    return order.sellerId === this.sellerId;c
                });
        }

});
