angular.module("blushed").service("cartService", function($http) {

  this.total = 0;
 
      // this.dateValue;
      this.dateScheduled = function(date){
          this.startDate = date;
      };

      this.getProducts = function(){
        // return products;
        return $http({
            method: 'GET',
            url: '/api/products',
          });
      };

      var cart = [];

      this.getCart = function(){
        return $http({
          method: 'GET',
          url: '/cart'
        });
      };

      this.addToCart = function(item){
        item.qty = 1;
            return $http({
              method: 'POST',
              url: '/cart',
              data: item
            });
      };

      this.removeFromCart = function(product){
        return $http({
          method: 'PUT',
          url: '/cart/remove',
          data: product
        });
          // for(var i = 0; i < cart.length; i++){
          //     if(cart[i].id === product.id)
          //     cart.splice(i, 1);
          // }
      };

      this.updateCart = function(product){
        console.log("function ran");
        return $http({
          method: 'PUT',
          url: '/cart/update',
          data: product
        });
      };

      this.placeOrder = function(order){
          return $http({
              method: 'POST',
              url: '/api/orders',
              data: order
          });
      };

});
 