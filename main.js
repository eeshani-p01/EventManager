var eventApp = angular.module('eventApp',['ngRoute']);

eventApp.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl:'pages.html',
		controller: 'pagesControl'
	})
	.when('/addevent',{
		templateUrl:'add_event.html',
		controller: 'addeventControl'
	})
	.when('/pages/:id1',{
		templateUrl:'pages.html',
		controller: 'pagesControl'
	})
	.when('/event/:id',{
		templateUrl:'event.htm',
		controller:'eventControl'
	})

})

// eventApp.controller('homeControl',function($scope,$http){
// 	$scope.events = [];
//
// 	$http({
// 		'method' : 'GET',
// 		'url' : 'http://eventmanager-server.herokuapp.com/events',
// 		'headers': 'Content-Type: application/json\n',
// 		"headerData": [
// 					{
// 						"key": "d681cbb9-fb83-1f2e-746a-57da0f33ef98",
// 						"value": "application/json",
// 						"description": "",
// 						"enabled": true
// 					}
// 				]
// 	}).then(function(response){
// 		$scope.events = response.data;
// 		$scope.events.length=6;
// 				// console.log($scope.events.length)
// 	},function(xhr){
// 		console.log(xhr)
// 	})
//
// })

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
			$http({
				'method' : 'GET',
				'url' : "http://eventmanager-server.herokuapp.com/comments",
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
				var value = response.data;
				// console.log(value)
				for(var i=0;i<value.length;i++)
				{
					if(value[i].postId==id)
					{
						$scope.comments.push(value[i])
						// console.log(value[i])
					}
				}
				// console.log(response.data.comments[0].id)
				// console.log('comment
			},function(xhr){
				console.log(xhr)
			})

			$scope.comment=function(){
				var text=$('.media.make_comment .media-body input').val();
				// console.log(text)
				var data1 = {
					"body":text,
					"postId": id
				}
				// console.log(data1)
				$http({
					'method' : 'POST',
					'url' : 'http://eventmanager-server.herokuapp.com/comments',
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
					$scope.comments = response.data.comments;
					console.log(response.data)
				},function(xhr){
					console.log(xhr)
				})
				// location.reload(true)
			}
			// $http({
			// 	'method' : 'POST',
			// 	'url' : 'http://eventmanager-server.herokuapp.com/comments',
			// 	'headers': 'Content-Type: application/json\n',
			// 	"headerData": [
			// 				{
			// 					"key": "d681cbb9-fb83-1f2e-746a-57da0f33ef98",
			// 					"value": "application/json",
			// 					"description": "",
			// 					"enabled": true
			// 				}
			// 			],
			// 	'data':data1
			// }).then(function(response){
			// 	$scope.events = response.data;
			// },function(xhr){
			// 	console.log(xhr)
			// })
})
eventApp.controller('pagesControl',function($scope,$routeParams,$http){
	var id1;
	if($routeParams=='NULL')
	{
		id1=1;
	}
	else
		{
			id1 = $routeParams.id1;
		}
				url='http://eventmanager-server.herokuapp.com/events?_page='+id1+'&_limit=6';
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
						$scope.events=[];
							$scope.events=response.data;
						// $scope.events.length=6;
								// console.log($scope.events)
								// location.reload()
					},function(xhr){
						console.log(xhr)
					})

					if(id1>3)
					{
						alert("Page Not Found")
					}

})

eventApp.controller('addeventControl',function($scope,$http){
	$('.dialog #dial').addClass('animated zoomIn');
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
		// console.log(data1)

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
