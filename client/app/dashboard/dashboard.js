angular.module('socialStock.dash', [])

.controller('DashController', function ($scope, $http, clientFactory) {
  console.log("inside DashController!")
  $scope.data = {};
  // $scope.findPrice;

  // $scope.getPortfolio = clientFactory.getPortfolio;

  $scope.portfolio;
  $scope.networth;

  clientFactory.getPortfolio().then(function(data){
    $scope.portfolio = data.data;

    $scope.networth = 0;
    for(var i = 0; i < data.data.stocks.length; i++){
      $scope.networth+= data.data.stocks[i].current_price * data.data.stocks[i].shares;
    }
    $scope.networth += $scope.portfolio.cash_balance;
  })

  $scope.refresh = function(){
    clientFactory.getPortfolio().then(function(data){
      $scope.portfolio = data.data;

      $scope.networth = 0;
      for(var i = 0; i < data.data.stocks.length; i++){
        $scope.networth+= data.data.stocks[i].current_price * data.data.stocks[i].shares;
      }
      $scope.networth += $scope.portfolio.cash_balance;
    })
  }

  $scope.sell = function(sellStockInfo){

    clientFactory.sellStock(sellStockInfo).then(function(data){
      $scope.portfolio = data.data

      // $scope.networth = 0;
      // for(var i = 0; i < data.data.stocks.length; i++){
      //   console.log("data.data.stocks[i].current_price", data.data.stocks[i].current_price);
      //   console.log("data.data.stocks[i].shares", data.data.stocks[i].shares)
      //   $scope.networth+= data.data.stocks[i].current_price * data.data.stocks[i].shares;
      //   console.log("$scope.networth", $scope.networth)
      // }
      // console.log("$scope.networth", $scope.networth)
      // $scope.networth += $scope.portfolio.cash_balance;
      $scope.refresh();
    })
  };

  var date = new Date();

  $scope.createAndSell = function(sn, name, cfc, cd, cp, s){

    var stockToSell = {
        "screen_name": sn,
        "name": name,
        "current_follower_count": cfc,
        "current_date": cd,
        "current_price": cp,
        "shares": s

    }

    $scope.sell(stockToSell);


  }

//   $scope.sellStockInfo = {
//     "screen_name": $scope.stock.screen_name,
//     "name": $scope.stock.name,
//     "current_follower_count": 15000000,
//     "current_date": date,
//     "current_price": 15,
//     "shares": 20 // need drop down menu!
//   }
});

