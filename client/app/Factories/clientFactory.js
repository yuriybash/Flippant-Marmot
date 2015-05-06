//This is a factory shared by the dashboard and search controllers. The functions
//here will be used in both controllers' scopes.

angular.module('socialStock.factory', [])

	.factory('clientFactory', function($http){


		//gets Twitter stats for a specific handle;
		var getTwitterInfo = function (handle) {
		    return $http({
		      method: 'POST',
		      url: '/api/twitter',
		      data: {twitterHandle:handle}
		    })
		    .then(function (resp) {
		      return resp;
		    });
		  };

		//gets portfolio for currently logged-in user
		var getPortfolio = function () {
		    return $http({
		      method: 'GET',
		      url: '/api/portfolio'
		    })
		    .then(function (resp) {
		    	console.log("initial resp: ", resp.data)


		   	  console.log('getPortfolio response: ', resp)
		      return resp;
		    });
		  };


		  var buyStock = function (stockInfo) {
		      return $http({
		        method: 'POST',
		        url: '/api/portfolio/buy',
		        data: stockInfo
		      })
		      .then(function (resp) {
		        return resp;
		      });
		    };

		  var sellStock = function (stockInfo) {
		        return $http({
		          method: 'POST',
		          url: '/api/portfolio/sell',
		          data: stockInfo
		        })
		        .then(function (resp) {
		          return resp;
		        });
		      };


		return {
			getPortfolio: getPortfolio,
			getTwitterInfo: getTwitterInfo,
			buyStock: buyStock,
			sellStock: sellStock
		}


	})
