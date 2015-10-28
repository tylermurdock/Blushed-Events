angular.module("blushed").controller("checkoutCtrl", function($scope, cartService) {
  $scope.dateValue = cartService.dateValue;
  $scope.dateScheduled = function(){

      console.log($scope.dateValue);
  };

});
