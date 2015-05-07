angular.module('socialStock', [
  'socialStock.auth',
  'socialStock.dash',
  'socialStock.search',
  'socialStock.factory',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/dashboard', {
      templateUrl: 'app/dashboard/dashboard.html',
      controller: 'DashController'
    })
    .when('/search', {
      templateUrl: 'app/search/search.html',
      controller: 'SearchController'
    })
    .when('/logout', {
      templateUrl: 'app/auth/auth.html',
      controller: 'AuthController'
    })
    .otherwise({
      redirectTo: '/dashboard'
    });

    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    // $httpProvider.interceptors.push('AttachTokens');
})
