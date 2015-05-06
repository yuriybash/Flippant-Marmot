angular.module('socialStock.search', [])

.controller('SearchController', function ($scope, $location, clientFactory) {
  $scope.search = function(term){
    clientFactory.getTwitterInfo(term).then(function(data){
      $scope.stocks = [data.data];
      console.log($scope.stocks);
    });
  };
  $scope.buyStock = function(shares){
    clientFactory.buyStock(shares);
  }
});
