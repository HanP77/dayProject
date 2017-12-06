angular.module('master').controller('loginController',function ($scope,$state,$http) {
	$scope.sendData = _sendData;
	$scope.goToAccount = _goToAccount;
	

	function _sendData() {
		
		$http.post('http://localhost:3000/login', {username: $scope.username , password: $scope.password}).then(function(response){
			_token = response.data.token;
            localStorage.setItem(_token)
            console.log(_token);
			$state.go('listUsers');
			
		}); 	
	}

	function _goToAccount() {
		$state.go('accountCreation');
	}
	
		

})