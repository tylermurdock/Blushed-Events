angular.module('blushed').controller('adminCtrl', function ($scope, cartService, getProducts, authService) {

    $scope.products = getProducts;

    $scope.getProducts = function () {
        authService.getProducts().then(function (products) {
            $scope.products = products;
        });
    };
    
    $scope.postProduct = function () {
        authService.postProduct($scope.newProduct).then(function () {
            $scope.getProducts();
            $scope.newProduct = {};
        });
    };


    $scope.removeFromDatabase = function (id) {
        authService.removeFromDatabase(id).then(function (response) {
            $scope.products = response;
        });

    };



    //     $scope.removeFromCart = function(product, $index){
    //     product.inCart = false;
    //     cartService.removeFromCart(product);
    //     $scope.cartProducts.splice($index, 1);
    //     console.log(product, $index);
    //     $scope.calculateTotal();
    //   };
});
