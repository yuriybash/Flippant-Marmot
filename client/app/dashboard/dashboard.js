angular.module('socialStock.dash', [])

.controller('DashController', function($scope, $http, clientFactory) {
    console.log("inside DashController!")


    $scope.portfolio;
    $scope.networth;


    /**
     * This function refreshes the dashboard with the user's most recent portfolio data.
     * It uses the getPortfolio function in the clientFactory factory.
     * Asynchronous.
     */
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


    /**
     * This function sells a given stock when the user chooses to do from the dashboard.
     *  @param {String} sn - screen_name of stock to sell
     *  @param {String} name - name of stock to sell
     *  @param {String} cfc - current follower count of stock to sell
     *  @param {Date} cd - current date
     *  @param {Number} cp - current price of stock to sell
     *  @param {Number} s - number of stocks to sell
     */
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
