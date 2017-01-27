(function() {
	angular
		.module('myApp', [])
		.controller('TitleController', ['$scope', function($scope) {
			$scope.lessonNum = '01';
		}])
		.controller('WrapperController', ['$scope', function($scope) {
			$scope.click = function() {
				$scope.hide = !$scope.hide;
			};
		}]);



})();