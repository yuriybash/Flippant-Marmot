angular.module('socialStock.search', [])


/** This is a controller to dictate search functions with the use of the helper functions in the clientFactory */
.controller('SearchController', function ($scope, $location, clientFactory) {

  /** search function to get follower data and current price of stock
  * @param {string} handle - The twitter handle searching
  */
  $scope.search = function(handle){
    clientFactory.getTwitterInfo(handle).then(function(data){
      $scope.stocks = [data.data];
      console.log($scope.stocks);
      $scope.searchTerm = '';
    });
  };

  /** buy function that sends the stock information to the helper function on the factory, then redirects to dashboard
  * @param {string} shares - a string of the integer of shares being purchased
  */
  $scope.buyStock = function(shares){
    var date = new Date();
    var purchase = {
      "screen_name": "@" + $scope.stocks[0].screen_name,
      "name": $scope.stocks[0].name,
      "follower_count_at_purchase": $scope.stocks[0].follower_count_at_query_time,
      "price_at_purchase": $scope.stocks[0].price_at_purchase,
      "date_of_purchase": date.toString(),
      "shares": +shares
    };
    clientFactory.buyStock(purchase).then(function(data){
      console.log("Data received from portfolio controller to search.js: ", data)
        if(data.data = "Overdraft! You cannot buy this stock!") {
          alert("Overdraft! You cannot buy this stock!");
        }
        $location.path('/dashboard');
    });
  }
});
