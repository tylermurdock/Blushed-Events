angular.module("blushed").controller("checkoutCtrl", function($scope, cartService, cart) {
  $scope.startDate= cartService.startDate;
  $scope.dateScheduled = function(){

      console.log($scope.startDate);
  };
  $scope.showDatePicker = false;
    $scope.datesaved = false;
    
    $scope.saveDate = function(){
        $scope.showDatePicker = false;
        $scope.startDate;
    };



/////////// CHECKOUT CART ////////


    $scope.cartProducts = cart.data;
    console.log($scope.cartProducts);

    $scope.calculateTotal = function () {
        $scope.total = 0;
        for (var i = 0; i < $scope.cartProducts.length; i++) {
            $scope.cartProducts[i].totalPrice = $scope.cartProducts[i].price * $scope.cartProducts[i].qty;
            $scope.total += $scope.cartProducts[i].totalPrice;
        }
    };

    $scope.calculateTotal();

////////////// PLACING ORDER ///////////

    $scope.placeOrder = function(){
        $scope.newOrder.rentals = [];
        $scope.newOrder.pickUpDate = $scope.startDate;
        for (var i = 0; i < $scope.cartProducts.length; i++){
            var eachRental = {};
           eachRental.id = $scope.cartProducts[i]._id; 
           eachRental.name = $scope.cartProducts[i].name;
           eachRental.qty = $scope.cartProducts[i].qty;
           eachRental.price = $scope.cartProducts[i].price;
           eachRental.img = $scope.cartProducts[i].img;
           $scope.newOrder.rentals.push(eachRental);
        }
        console.log('new order', $scope.newOrder);
        console.log('new order', $scope.newOrder.pickUpDate);
        
        cartService.placeOrder($scope.newOrder).then(function(response){
            $scope.newOrder = {};
            console.log(response);
        });
        location.href = '#/thankYou';
    };
    
    
    
    
    
    
    // $scope.postProduct = function () {
    //     authService.postProduct($scope.newProduct).then(function () {
    //         $scope.getProducts();
    //         $scope.newProduct = {};
    //     });
    // };
});
