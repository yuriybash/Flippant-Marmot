//This is a factory shared by the dashboard and search controllers. The functions
//here will be used in both controllers' scopes.

angular.module('socialStock.factory', [])

.factory('clientFactory', function($http) {


    /**
     * This function makes a Twitter API request and returns the user's information (follower count, etc)
     *  @param {String} handle - Twitter handle to query
     */
    var getTwitterInfo = function(handle) {
        return $http({
                method: 'POST',
                url: '/api/twitter',
                data: {
                    twitterHandle: handle
                }
            })
            .then(function(resp) {
                return resp;
            });
    };

    /**
     * This function returns the portfolio for the currently logged in user.
     */
    var getPortfolio = function() {
        return $http({
                method: 'GET',
                url: '/api/portfolio'
            })
            .then(function(resp) {
                console.log("initial resp: ", resp.data)

                console.log('getPortfolio response: ', resp)
                return resp;
            });
    };

    /**
     * This function buys a specific stock.
     * @param {Object} stockInfo - stock to buy. Object properties defined in DashboardController
     */
    var buyStock = function(stockInfo) {
        console.log(stockInfo);
        return $http({
                method: 'POST',
                url: '/api/portfolio/buy',
                data: stockInfo
            })
            .then(function(resp) {
                return resp;
            });
    };

    /**
     * This function sells a specific stock.
     * @param {Object} stockInfo - stock to sell. Object properties defined in DashboardController
     */
    var sellStock = function(stockInfo) {
        return $http({
                method: 'POST',
                url: '/api/portfolio/sell',
                data: stockInfo
            })
            .then(function(resp) {
                return resp;
            });
    };

    //provides access to these functions to controllers
    return {
        getPortfolio: getPortfolio,
        getTwitterInfo: getTwitterInfo,
        buyStock: buyStock,
        sellStock: sellStock
    }

});
