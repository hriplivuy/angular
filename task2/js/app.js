(function() {
	angular
		.module('myApp', [])
		.controller('MainController', ['$scope', function($scope) {

			//$scope.numPerPage = 5;
			$scope.countPerPage = 5;
			$scope.offset = 0;
			$scope.currentPage = 0;

			


			// angular.fromJson(window.localStorage.getItem('taskList')) || []
			$scope.newTaskName = '';
			$scope.taskList = angular.fromJson(window.localStorage.getItem('taskList')) || [];

			$scope.addTask = function() {
				if ($scope.newTaskName) {
					$scope.taskList.push({
						id: $scope.taskList.length,
						name: $scope.newTaskName,
						done: false
					});
					$scope.newTaskName = '';
				}
			};

			$scope.removeTask = function(taskId) {
				for (var i = 0; i < $scope.taskList.length; i++) {
					if ($scope.taskList[i].id === taskId) {
						if (confirm('Are you sure you want to delete item `' + $scope.taskList[i].name + '`')) {
							$scope.taskList.splice(i, 1);
							if($scope.taskList.length - $scope.offset === 0){
								$scope.currentPage = $scope.currentPage -1;
								$scope.offset = $scope.currentPage  * $scope.countPerPage;
							}
						}
						break;
					}
				}
				
			};
			$scope.removeTaskAll = function() {
				if (confirm('Are you sure you want to delete items')) {
					$scope.taskList.splice($scope.offset, $scope.countPerPage);
				}
				$scope.watchOffset();
			};

			$scope.watchOffset = function(){
				if($scope.currentPage == 0){
					$scope.currentPage = $scope.currentPage;
				} else {
					$scope.currentPage = $scope.currentPage -1;
				}
				$scope.offset = $scope.currentPage * $scope.countPerPage;
			}

			$scope.$watch('taskList', function(newVal, oldVal) {
				if (newVal !== oldVal) {
					window.localStorage.setItem('taskList', angular.toJson($scope.taskList));
				}
				$scope.numPage = Math.ceil($scope.taskList.length/$scope.countPerPage);
				$scope.arrRows = [];

				for (var i = 0; i < $scope.numPage; i++){
					$scope.arrRows.push(i+1);
				}
				$scope.watchCheck();

			}, true);


			
			$scope.firstPage = function() {
				return $scope.currentPage == 0;
			}
			$scope.lastPage = function() {
				var lastPageNum = Math.ceil($scope.taskList.length / $scope.countPerPage -1);
				return $scope.currentPage == lastPageNum;
			}
			$scope.numberOfPages = function(){
				return Math.ceil($scope.taskList.length / $scope.countPerPage);
			}
			$scope.startingItem = function() {
				return $scope.currentPage * $scope.countPerPage;
			}
			$scope.pageBack = function() {
				$scope.currentPage = $scope.currentPage - 1;
				$scope.offset = $scope.currentPage * $scope.countPerPage;
				$scope.watchCheck();
			}
			$scope.pageForward = function() {
				$scope.currentPage = $scope.currentPage + 1;
				$scope.offset = $scope.currentPage  * $scope.countPerPage;
				$scope.watchCheck();
			}
			$scope.pagingClick = function(index) {
				$scope.currentPage = index;
				$scope.activeItemIndex = index;
				$scope.offset = index * $scope.countPerPage;
				$scope.watchCheck();
			};
			
			
			$scope.selectAll = {
				value: false
			}

			$scope.watchCheck = function (){
				var checkNum = 0;
				var viewElements = $scope.countPerPage;

				if($scope.currentPage == Math.ceil($scope.taskList.length / $scope.countPerPage -1)){
					viewElements = ( $scope.taskList.length % $scope.countPerPage );
					if(viewElements == 0){
						viewElements = $scope.countPerPage;
					}
				}
				//console.log('num elements on page ' + viewElements);

				for (var i = $scope.offset; i < $scope.offset + viewElements; i++) {
					if($scope.taskList[i].done == true){
						checkNum++
					}
					if(checkNum == viewElements){
						//console.log('all check');
						$scope.selectAll = {
							value: true
						}
					} else{
						$scope.selectAll = {
							value: false
						}
					}
				}
			}

			$scope.onAllCheckClick = function(){
				if ($scope.selectAll.value) {
					for (var i = $scope.offset; i < $scope.offset + $scope.countPerPage; i++) {
						if($scope.taskList[i]){
							$scope.taskList[i].done = true;
						}
					}
				} else {
					for (var i = $scope.offset; i < $scope.offset + $scope.countPerPage; i++) {
						if($scope.taskList[i]){
							$scope.taskList[i].done = false;
						}
					}
				}
			}

			// $scope.$watch('numPerPage', function(newVal, oldVal) {
			// 	$scope.countPerPage = $scope.numPerPage;
			// }, true);

			// $scope.$watch('countPerPage', function(newVal, oldVal) {
			// 	if (newVal !== oldVal) {
			// 		window.localStorage.setItem('taskList', angular.toJson($scope.taskList));
			// 	}
			// 	$scope.numPage = Math.ceil($scope.taskList.length/$scope.countPerPage);
			// 	$scope.arrRows = [];

			// 	for (var i = 0; i < $scope.numPage; i++){
			// 		$scope.arrRows.push(i+1);
			// 	}
			// 	$scope.watchCheck();
			// }, true);
			


		}]);


})();