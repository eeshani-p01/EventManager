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
	$scope.comments=[];
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
	var url='http://eventmanager-server.herokuapp.com/events/'+id+'?_embed=comments';
	$http({
		'method' : 'GET',
		'url' : url,
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
		$scope.comments = response.data.comments;
		console.log(response.data.comments[0].id)
		// console.log('comments')
	},function(xhr){
		console.log(xhr)
	})
})

eventApp.controller('addeventControl',function($scope,$http){
	$scope.sendata=function(){
	// console.log("hello")
		var title =  $('.dialog #title').val();
		var date =  $('.dialog #date').val();
		var prize =  $('.dialog #cost').val();
		var org =  $('.dialog #host').val();
		var data1={
			"title":title,
			"date":date,
			"price":prize,
			"organiser":org
		}
		console.log(data1)

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
						],
				'data':data1
			}).then(function(response){
				$scope.events = response.data;
			},function(xhr){
				console.log(xhr)
			})
	}
})
