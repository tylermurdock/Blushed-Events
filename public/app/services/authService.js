angular.module("blushed").service("authService", function ($http) {
	this.getAuthUser = function () {
		return $http.get('/auth/user')
			.then(function (response) {
				return response.data;
			});
	};

	this.getProducts = function () {
		return $http.get('/api/products').then(function (res) {
			return res.data;
		});
	};

	this.postProduct = function (newProduct) {
		return $http.post('/api/products', newProduct);
	};


	this.removeFromDatabase = function (id) {
		return $http.delete('/api/products/remove/' + id).then(function (res) {
			return res.data;
		});
	};
	
	var orders = [];

	this.getOrders = function () {
		return $http.get('/api/orders').then(function (res) {

			return res.data;
		});
	};

});
