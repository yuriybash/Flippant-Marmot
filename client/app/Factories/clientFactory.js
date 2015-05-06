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
		    	if(resp.stocks.length > 0){
			    	for(var i = 0; i < resp.stocks.length; i++){
			    		console.log("GET PORTFOLIO RESPONSE GOES THROUGH")
			    		var currentNumFollowers = this.getTwitterInfo({'twitterHandle': resp.stocks[i].screen_name}).follower_count_at_query_time;
			    		var previousFollowers = resp.stocks[i].follower_count_at_purchase;
			    		var numDays = Math.abs(new Date() - resp.stocks[i].date_of_purchase)/(1000*60*60*24);
			    		var growthRate = Math.pow((currentNumFollowers-previousFollowers)/previousFollowers, 1/numDays) - 1;
			    		var growthRateVsExpected = (growthRate - .0007)/.0007;
			    		resp.stocks[i]["newPrice"] = (1+growthRateVsExpected) * resp.stocks[i].price_at_purchase;
			    	}
		    	}

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