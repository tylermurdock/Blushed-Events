angular.module("blushed").controller("ordersCtrl", function($scope, authService, getOrders) {


$scope.orders = getOrders;
console.log($scope.orders);





});
