angular.module('socialStock.dash', [])

.controller('DashController', function($scope, $http, clientFactory) {
    console.log("inside DashController!")

    // $scope.getPortfolio = clientFactory.getPortfolio;

    $scope.portfolio;
    $scope.networth;


    $scope.refresh = function() {
        clientFactory.getPortfolio().then(function(data) {
            $scope.portfolio = data.data;

            $scope.networth = 0;
            for (var i = 0; i < data.data.stocks.length; i++) {
                $scope.networth += data.data.stocks[i].current_price * data.data.stocks[i].shares;
            }
            $scope.networth += $scope.portfolio.cash_balance;
        })
    }

    $scope.createAndSell = function(sn, name, cfc, cd, cp, s) {

        var stockToSell = {
            "screen_name": sn,
            "name": name,
            "current_follower_count": cfc,
            "current_date": cd,
            "current_price": cp,
            "shares": s

        }

        clientFactory.sellStock(stockToSell).then(function(data) {
            $scope.portfolio = data.data

            $scope.refresh();
        })


    }


    $scope.refresh();

});
