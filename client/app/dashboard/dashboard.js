angular.module('socialStock.dash', [])

.controller('DashController', function ($scope, $http, clientFactory) {
  console.log("inside DashController!")
  $scope.data = {};
  // $scope.findPrice;

  // $scope.getPortfolio = clientFactory.getPortfolio;

  $scope.portfolio;

  clientFactory.getPortfolio().then(function(data){
    $scope.portfolio = data.data;
    console.log($scope.portfolio);
  })


});


