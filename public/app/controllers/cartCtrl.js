angular.module("blushed").controller("cartCtrl", function ($scope, $rootScope, cartService, cart, authService) {


  

    $scope.getAuthUser = function () {
        authService.getAuthUser()
            .then(function (data) {
                $scope.authUser = data;
                console.log(data);
            });
    };

    $scope.getAuthUser();

    $rootScope.cartProducts = cart.data;


    $rootScope.calculateTotal = function () {
        $scope.total = 0;
        for (var i = 0; i < $scope.cartProducts.length; i++) {
            $scope.cartProducts[i].totalPrice = $scope.cartProducts[i].price * $scope.cartProducts[i].qty;
            $scope.total += $scope.cartProducts[i].totalPrice;
        }
    };

    $rootScope.calculateTotal();


    $scope.removeFromCart = function (product, $index) {
        product.inCart = false;
        cartService.removeFromCart(product);
        $scope.cartProducts.splice($index, 1);
        console.log(product, $index);
        $scope.calculateTotal();
    };

    $scope.updateCart = function (product, $index) {
        cartService.updateCart(product);
        $scope.calculateTotal();
    };

    $scope.showDatePicker = false;
    $scope.datesaved = false;
    
    $scope.saveDate = function(){
        $scope.showDatePicker = false;
        $scope.startDate;
    };

    // $scope.dateScheduled = function(){
    // };

    // $scope.myDate = new Date();
    // $scope.minDate = new Date(
    //     $scope.myDate.getFullYear(),
    //     $scope.myDate.getMonth() - 2,
    //     $scope.myDate.getDate());
    // $scope.maxDate = new Date(
    //     $scope.myDate.getFullYear(),
    //     $scope.myDate.getMonth() + 2,
    //     $scope.myDate.getDate());
    // $scope.onlyWeekendsPredicate = function (date) {
    //     var day = date.getDay();
    //     return day === 0 || day === 6;
    // }


    // cartService.setCartCookie().then(function(){cartService.getCartCookie();});

    $scope.enableProceedButton = function () {
        if ($scope.startDate) {
            cartService.dateScheduled($scope.startDate);
            location.href = '#/checkout';
        } else return alert("Please select a date");
    };



});
