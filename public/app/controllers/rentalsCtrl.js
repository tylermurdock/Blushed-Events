angular.module('blushed').controller('rentalsCtrl', function($scope, cartService, cart, getProducts){

  $scope.products = getProducts;
  $scope.cartProducts = cart.data;
  itemInCart();


  $scope.addToCart = function(product){
    cartService.addToCart(product).then(function(response) {
      $scope.cartProducts = response.data;
      itemInCart();
    });
  };


  function itemInCart() {
    $scope.products.forEach(function(product) {
      for (var i = 0; i < $scope.cartProducts.length; i++) {
        if (product._id === $scope.cartProducts[i]._id) {
          product.inCart = true;
        }
      }
    });
    return;
  }

 
//   $('.dropdown-button').dropdown({
//        inDuration: 300,
//        outDuration: 225,
//        constrain_width: false, // Does not change width of dropdown to that of the activator
//        hover: false, // Activate on hover
//        gutter: 0, // Spacing from edge
//        belowOrigin: false, // Displays dropdown below the button
//        alignment: 'left' // Displays dropdown with edge aligned to the left of button
//      }
//    );


   

});

