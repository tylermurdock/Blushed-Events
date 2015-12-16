angular.module('blushed', ['ngRoute', 'ngMaterial', 'ngAnimate'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/templates/home.html',
                controller: 'homeCtrl'
            })
            .when('/about', {
                templateUrl: 'app/templates/about.html',
                controller: 'aboutCtrl'
            })
            .when('/contact', {
                templateUrl: 'app/templates/contact.html',
                controller: 'contactCtrl'
            })
            .when('/rentals', {
                templateUrl: 'app/templates/rentals.html',
                controller: 'rentalsCtrl',
                resolve: {
                    cart: function (cartService) {
                        return cartService.getCart();
                    },
                    getProducts: function (cartService) {
                        return cartService.getProducts().then(function (response) {
                            return response.data;
                        });
                    }
                }
            })
            .when('/cart', {
                templateUrl: 'app/templates/cart.html',
                controller: 'cartCtrl',
                resolve: {
                    cart: function (cartService) {
                        return cartService.getCart();
                    }
                }
            })
            .when('/checkout', {
                templateUrl: 'app/templates/checkout.html',
                controller: 'checkoutCtrl',
                resolve: {
                    cart: function (cartService) {
                        return cartService.getCart();
                    }
                }
            })
            .when('/thankYou', {
                templateUrl: 'app/templates/thankYou.html',
                controller: 'thankYouCtrl'
            })
            .when('/orders', {
                templateUrl: 'app/templates/orders.html',
                controller: 'ordersCtrl',
                resolve: {
                    getOrders: function (authService) {
                        return authService.getOrders().then(function (response) {
                            return response;
                        });
                    }
                }
            })
            .when('/login', {
                templateUrl: 'app/templates/login.html',
                controller: 'loginCtrl'
            })
            .when('/admin', {
                templateUrl: 'app/templates/admin.html',
                controller: 'adminCtrl',
                resolve: {
                    cart: function (cartService) {
                        return cartService.getCart();
                    },
                    getProducts: function (cartService) {
                        return cartService.getProducts().then(function (response) {
                            return response.data;
                        });
                    }
                }
            })
            .otherwise('/');
    });
 