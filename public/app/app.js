angular.module('blushed', ['ngRoute', 'scDateTime', 'ngMaterial', 'ngAnimate'])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/templates/home.html',
      controller: 'homeCtrl'
    })
    .when('/about',{
      templateUrl: 'app/templates/about.html',
      controller: 'aboutCtrl'
    })
    .when('/contact',{
      templateUrl: 'app/templates/contact.html',
      controller: 'contactCtrl'
    })
    .when('/rentals',{
      templateUrl: 'app/templates/rentals.html',
      controller: 'rentalsCtrl',
      resolve: {
        cart: function(cartService) {
          return cartService.getCart();
        },
        getProducts: function(cartService) {
          return cartService.getProducts().then(function(response){
            return response.data;
          });
        }
      }
    })
    .when('/cart',{
      templateUrl: 'app/templates/cart.html',
      controller: 'cartCtrl',
      resolve: {
        cart: function(cartService) {
          return cartService.getCart();
        }
      }
    })
    .when('/checkout',{
      templateUrl: 'app/templates/checkout.html',
      controller: 'checkoutCtrl',
      // resolve: {
      //   dateScheduled: function(cartCtrl){
      //     return cartCtrl.dateScheduled();
      //   }
      // }
    })
    .when('/order',{
      templateUrl: 'app/templates/order.html',
      controller: 'orderCtrl'
    })
    .when('/login',{
      templateUrl: 'app/templates/login.html',
      controller: 'loginCtrl'
    })
    .otherwise('/');
})
.value('scDateTimeI18n', {
    previousMonth: "Previous Month",
    nextMonth: "Next Month",
    incrementHours: "Increment Hours",
    decrementHours: "Decrement Hours",
    incrementMinutes: "Increment Minutes",
    decrementMinutes: "Decrement Minutes",
    switchAmPm: "Switch AM/PM",
    now: "Now",
    cancel: "Cancel",
    save: "Save",
    weekdays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    switchTo: 'Switch to',
    clock: 'Clock',
    calendar: 'Calendar'
})

.value('scDateTimeConfig', {
    defaultTheme: 'material',
    autosave: false,
    defaultMode: 'date',
    defaultDate: undefined, //should be date object!!
    displayMode: 'full',
    defaultOrientation: false,
    displayTwentyfour: false,
    compact: false
});
