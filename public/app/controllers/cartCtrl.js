angular.module("blushed").controller("cartCtrl", function($scope, cartService, cart) {

  $scope.cartProducts = cart.data;


  $scope.calculateTotal = function() {
    $scope.total = 0;
    for (var i = 0; i < $scope.cartProducts.length; i++) {
      $scope.cartProducts[i].totalPrice = $scope.cartProducts[i].price * $scope.cartProducts[i].qty;
      $scope.total += $scope.cartProducts[i].totalPrice;
    }
  };

  $scope.calculateTotal();


  $scope.removeFromCart = function(product, $index){
    product.inCart = false;
    cartService.removeFromCart(product);
    $scope.cartProducts.splice($index, 1);
    console.log(product, $index);
    $scope.calculateTotal();
  };

  $scope.updateCart = function(product, $index){
    cartService.updateCart(product);
    $scope.calculateTotal();
  };

$scope.showDatePicker = false;
$scope.datesaved = false;

// $scope.dateScheduled = function(){
// };



  // cartService.setCartCookie().then(function(){cartService.getCartCookie();});

  $scope.enableProceedButton = function(){
    if($scope.dateValue){
      cartService.dateScheduled($scope.dateValue);
      location.href='#/checkout';
    }else return alert("Please select a date");
  };

});
