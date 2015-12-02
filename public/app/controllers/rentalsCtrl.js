angular.module('blushed').controller('rentalsCtrl', function($scope, cartService, cart, getProducts){
  // $scope.products = cartService.getProducts();
  $scope.products = getProducts;
  $scope.cartProducts = cart.data;
  itemInCart();
//$scope.rentals = rentals;



/*cartService.getProducts().then(function(res){
    console.log(res);
    $scope.products = res;
}, function(err) {
  console.log(err);
});*/

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

  // $scope.getCartCount = function(product){
  //   cartService.getCartCount(product).then(function(response){
  //     $scope.cartProducts = response.data;
  //     itemInCart();
  //   });
  // };
  $('.dropdown-button').dropdown({
       inDuration: 300,
       outDuration: 225,
       constrain_width: false, // Does not change width of dropdown to that of the activator
       hover: false, // Activate on hover
       gutter: 0, // Spacing from edge
       belowOrigin: false, // Displays dropdown below the button
       alignment: 'left' // Displays dropdown with edge aligned to the left of button
     }
   );


});


// $scope.products = function(){
//   cartService.getProducts().then(function(res){
//     $scope.product = res.products;
//   })
// }()
