angular.module("blushed").service("cartService", function($http) {

  this.total = 0;
  // var products =  [
  //         {
  //             img: 'img/whiteChest.jpg',
  //             name: "White Chest",
  //             price: 10000,
  //             category: "decoration",
  //             quantity: 1,
  //             id: 1
  //         },
  //         {
  //             img: 'img/bucketList.jpg',
  //             name: "Bucket List",
  //             price: 20,
  //             category: "decoration",
  //             quantity: 1,
  //             id: 2
  //         },
  //         {
  //             img: 'img/mrAndMrsSigns.jpg',
  //             name: "Mr and Mrs Signs",
  //             price: 57,
  //             category: "decoration",
  //             quantity: 1,
  //             id: 3
  //         },
  //         {
  //             img: 'img/chalkSigns.jpg',
  //             name: "Chalk Signs",
  //             price: 80000,
  //             category: "decoration",
  //             quantity: 1,
  //             id: 4
  //         },
  //         {
  //             img: 'img/beachJars.jpg',
  //             name: "Beach Jars",
  //             price: 6000,
  //             category: "decoration",
  //             quantity: 1,
  //             id: 5
  //         },
  //         {
  //             img: 'img/seashells.jpg',
  //             name: "Seashells",
  //             price: 100,
  //             category: "lighting",
  //             quantity: 1,
  //             id: 6
  //         },
  //         {
  //             img: 'img/seashellFrames.jpg',
  //             name: "Seashell Frames",
  //             price: 2000,
  //             category: "tablecloth",
  //             quantity: 1,
  //             id: 7
  //         }
  //     ];
      // this.dateValue;
      this.dateScheduled = function(date){
          this.dateValue = date;
      };

      this.getProducts = function(){
        // return products;
        return $http({
            method: 'GET',
            url: '/rentals',
          });

        // var deferred = $q.defer();
        //
        // $http({
        //     method: 'GET',
        //     url: '/rentals',
        //   }).then(function(res) {
        //     console.log(res);
        //     deferred.resolve(res.data);
        //   }, function(err) {
        //     console.log(err);
        //     deferred.reject(err);
        //   });
        //
        //   return deferred.promise;
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

      // this.getTotal = function(){
      //   for(var i = 0; i < cart.length; i++){
      //     this.total += cart[i].price;
      //   }
      //   return this.total;
      // }.bind(this);

      // this.enableProceedButton = function(){
      //   if()
      // }

      // this.setCartCookie = function(){
      //   return $http.post('/api/setCookie', {testProduct: "this is a test product"});
      // };
      //
      // this.getCartCookie = function(){
      //   return $http.get('/api/getCookie').then(function(res){console.log(res);});
      // };



});
