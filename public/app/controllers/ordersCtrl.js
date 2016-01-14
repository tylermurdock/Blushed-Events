angular.module("blushed").controller("ordersCtrl", function($scope, $rootScope, authService, getOrders) {


$scope.orders = getOrders;
console.log($scope.orders);

   
   
   
   
   
//    $rootScope.cartProducts = cart.data;


    // $rootScope.calculateTotal = function () {
    //     $scope.total = 0;
    //     for (var i = 0; i < $scope.cartProducts.length; i++) {
    //         $scope.cartProducts[i].totalPrice = $scope.cartProducts[i].price * $scope.cartProducts[i].qty;
    //         $scope.total += $scope.cartProducts[i].totalPrice;
    //     }
    // };

    // $rootScope.calculateTotal();



});

// service    make sure to inject $q

//    this.getTasks = function (userId) {
//         var deferred = $q.defer();
//         $http({
//             method: 'GET',
//             url: '/api/user/' + userId
//         }).then(function (response) {
//             // console.log(response.data);
//             deferred.resolve(response.data)
//         })
//         return deferred.promise
//     };




// Controller inject the service.

//   $scope.tasks = function () {
//         mainService.getTasks($scope.user).then(function (response) {
//             $scope.taskData = response.tasks;
//             $scope.name = response.name;
//         })
//     };


