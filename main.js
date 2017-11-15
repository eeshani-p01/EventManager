
var eventApp = angular.module('EventApp',['ngRoute']);  //ngRoute is additional functionality and this are called as module

eventApp.config(function($routeProvider){
  $routeProvider            //and object defined in ngroute
  .when('/',{
    templateUrl:'index.html',       //show this template when url is "www.....com/"
    controller:"eventController"          //and this controller is to be used with this view
  })

})
eventApp.controller('eventController',function($scope,$http){
    $scope.array=[];
    $http({
        'method': 'GET',
        'url': 'http://eventmanager-server.herokuapp.com/events',
        'headers':'Content-Type:application/json',
        'headerData': [{
          "key":"d681cbb9-fb83-1f2e-746a-57da0f33ef98",
          "value":"application/json",
          "description":"",
          "enabled":true
        }]
      }).then(
        function (response) {
            console.log(response)
          },

        function(xhr){
                console.log(xhr)
          });

})
