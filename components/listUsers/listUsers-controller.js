angular.module('master').controller('listUsersController',function ($scope,$state) {

	function _displayList() {
          

          $http.get('http://localhost:3000/listUser', _token).then(function(response) {
            $scope.profileList = response.userlist;
          });
        }
})