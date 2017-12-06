angular.module('master').controller('accountCreationController',function ($scope,$state,$http) {

$scope.sendData = _sendData;



	function _sendData() {
		
		$http.post('http://localhost:3000/create-account', {username: $scope.username , password: $scope.password , firstName: $scope.firstName , lastName: $scope.lastName , age: $scope.age }).then(function(response){
			$state.go('login');
			
		}); 	
	}
	
	
})