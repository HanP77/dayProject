angular.module('master',['ui.router']);

angular.module('master').config(function ($stateProvider, $urlRouterProvider) 
{
	var loginState = {
		name : 'login',
		url : '/login',
		template : '<login></login>',
	}

	var accountCreation = {
		name : 'accountCreation',
		url: '/accountCreation',
		template: '<account-creation></account-creation>',
	}

	var listUsers = {
		name : 'listUsers',
		url: '/listUsers',
		template: '<list-users></list-users>',
	}

	$stateProvider.state(loginState);
	$stateProvider.state(accountCreation);
	$stateProvider.state(listUsers);

	$urlRouterProvider.otherwise('/login');
})