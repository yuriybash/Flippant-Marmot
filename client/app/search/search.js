angular.module('socialStock.search', [])

.controller('SearchController', function ($scope, $location) {
  // Your code here

  $scope.search = function(term){
    console.log(term);
  };

  console.log("inside searchController")
});
