angular.module('blushed')

.directive('navBar', function () {
	return {
		templateUrl: 'app/templates/navbar.html'
	}
})

.directive('footerDiv', function () {
	return {
		templateUrl: 'app/templates/footer.html'
	}
})


.directive('slider', function ($timeout) {
 return {
   restrict: 'AE',
   replace: true,
   scope:{
	   images: '='
   },
   link: function (scope, elem, attrs) {

	   scope.currentIndex=0;

	   scope.next=function(){
		   scope.currentIndex<scope.images.length-1?scope.currentIndex++:scope.currentIndex=0;
	   };

	   scope.prev=function(){
		   scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
	   };

	   scope.$watch('currentIndex',function(){
		   scope.images.forEach(function(image){
			   image.visible=false;
		   });
		   scope.images[scope.currentIndex].visible=true;
	   });

	   /* Start: For Automatic slideshow*/

	   var timer;

	   var sliderFunc=function(){
		   timer=$timeout(function(){
			   scope.next();
			   timer=$timeout(sliderFunc,5000);
		   },5000);
	   };

	   sliderFunc();

	   scope.$on('$destroy',function(){
		   $timeout.cancel(timer);
	   });

	   /* End : For Automatic slideshow*/

   },
   templateUrl:'app/templates/slider.html'
 }
});
