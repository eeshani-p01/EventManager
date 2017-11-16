var eventApp = angular.module('eventApp',['ngRoute']);

eventApp.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl:'Pages/home.htm',
		controller: 'homeControl'
	})
	.when('/addevent',{
		templateUrl:'Pages/add_event.html',
		controller: 'addeventControl'
	})
	.when('/event/:id',{
		templateUrl:'Pages/event.htm',
		controller:'eventControl'
	})

})

eventApp.controller('homeControl',function($scope,$http){
	$scope.events = [];
	$http({
		'method' : 'GET',
		'url' : 'http://eventmanager-server.herokuapp.com/events',
		'headers': 'Content-Type: application/json\n',
		"headerData": [
					{
						"key": "d681cbb9-fb83-1f2e-746a-57da0f33ef98",
						"value": "application/json",
						"description": "",
						"enabled": true
					}
				]
	}).then(function(response){
		$scope.events = response.data;
	},function(xhr){
		console.log(xhr)
	})
})

eventApp.controller('eventControl',function($scope,$routeParams,$http){
	var id = $routeParams.id;
	$scope.eventDetails = [];
	$http({
		'method' : 'GET',
		'url' : 'http://eventmanager-server.herokuapp.com/events',
		'headers': 'Content-Type: application/json\n',
		"headerData": [
					{
						"key": "d681cbb9-fb83-1f2e-746a-57da0f33ef98",
						"value": "application/json",
						"description": "",
						"enabled": true
					}
				]
	}).then(function(response){
		$scope.eventDetails = response.data[id-1];
	},function(xhr){
		console.log(xhr)
	})
})

eventApp.controller('addeventControl',function($scope,$http){
	// $scope.sendata=function()
	$http({
		'method' : 'POST',
		'url' : 'http://eventmanager-server.herokuapp.com/events',
		'headers': 'Content-Type: application/json\n',
		"headerData": [
					{
						"key": "d681cbb9-fb83-1f2e-746a-57da0f33ef98",
						"value": "application/json",
						"description": "",
						"enabled": true
					}
				]
	}).then(function(response){
		$scope.events = response.data;
	},function(xhr){
		console.log(xhr)
	})
})
