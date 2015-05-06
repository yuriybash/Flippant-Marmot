angular.module('socialStock.dash', [])

.controller('DashController', function ($scope, $http, clientFactory) {
  console.log("inside DashController!")
  $scope.data = {};
  // $scope.findPrice;

  $scope.getPortfolio = clientFactory.getPortfolio;
  $scope.getPortfolio();
});
