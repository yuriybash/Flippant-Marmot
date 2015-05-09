describe("clientFactory", function() {

    beforeEach(angular.mock.module('socialStock.factory'));
    var $httpBackend;
    var twitterRequestResponse;
    var portfolioRequestResponse;
    var buyRequestResponse;
    var sellRequestResponse;

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('POST', '/api/twitter').respond(

            {
                "screen_name": "katyperry",
                "name": "KATY PERRY",
                "follower_count_at_query_time": 69409630,
                "price_at_purchase": 69.40963
            }
        );

        $httpBackend.when('GET', '/api/portfolio').respond(

            {
                "_id": "5549719d8fbad77036cf4dca",
                "user_id": "55496daff856259432cc594f",
                "cash_balance": -4292.431392857145,
                "__v": 29,
                "stocks": []
            }
        );

        $httpBackend.when('POST', '/api/portfolio/buy').respond(

            {
                "_id": "5549719d8fbad77036cf4dca",
                "user_id": "55496daff856259432cc594f",
                "cash_balance": -5485.309964285716,
                "__v": 30,
                "stocks": [{
                    "screen_name": "@LadyGaga",
                    "name": "Lady Gaga ga",
                    "follower_count_at_purchase": 12000000,
                    "price_at_purchase": 12,
                    "date_of_purchase": "Tue May 05 2015 14:11:43 GMT-0700 (PDT)",
                    "shares": 100,
                    "_id": "554cfd33f6f3a448086de827"
                }]
            }
        );

        $httpBackend.when('POST', '/api/portfolio/sell').respond(

            {
                "_id": "5549719d8fbad77036cf4dca",
                "user_id": "55496daff856259432cc594f",
                "cash_balance": -5485.309964285716,
                "__v": 30,
                "stocks": [

                ]
            }
        );



    }))

    describe('getTwitterInfo', function() {
        it('should return katy perry\'s info', inject(function(clientFactory) {

            clientFactory.getTwitterInfo().then(function(data) {
                twitterRequestResponse = data;
                expect(twitterRequestResponse).toBeDefined();
                expect(twitterRequestResponse).toEqual({
                    "screen_name": "katyperry",
                    "name": "KATY PERRY",
                    "follower_count_at_query_time": 69409630,
                    "price_at_purchase": 69.40963
                });

                $httpBackend.flush();

            })

        }));
    });

    describe('getPortfolio', function() {
        it('should return an empty portfolio', inject(function(clientFactory) {

            clientFactory.getPortfolio().then(function(data) {
                portfolioRequestResponse = data;
                expect(portfolioRequestResponse.toBeDefined());
                expect(portfolioRequestResponse.toEqual({
                    "_id": "5549719d8fbad77036cf4dca",
                    "user_id": "55496daff856259432cc594f",
                    "cash_balance": -4292.431392857145,
                    "__v": 29,
                    "stocks": []
                }));

                $httpBackend.flush();


            })

        }));
    });


    describe('buyStock', function() {
        it('should return a portfolio with purchased stocks', inject(function(clientFactory) {

            clientFactory.buyStock().then(function(data) {
                buyRequestResponse = data;
                expect(buyRequestResponse.toBeDefined());
                expect(buyRequestResponse.toEqual({
                    "_id": "5549719d8fbad77036cf4dca",
                    "user_id": "55496daff856259432cc594f",
                    "cash_balance": -4292.431392857145,
                    "__v": 29,
                    "stocks": [{
                        "current_price": 0.01857142857143064,
                        "current_follower_count": 58921834,
                        "screen_name": "@BarackObama",
                        "name": "Barack Obama",
                        "follower_count_at_purchase": 58921821,
                        "price_at_purchase": 58.921821,
                        "date_of_purchase": "Fri May 08 2015 10:31:55 GMT-0700 (Pacific Daylight Time)",
                        "shares": 5,
                        "_id": "554cf30bde02351c1880e143"
                    }]
                }));

                $httpBackend.flush();


            })

        }));
    });

    describe('sellStock', function() {
        it('should return an empty portfolio after selling stocks', inject(function(clientFactory) {

            clientFactory.sellStock().then(function(data) {
                sellRequestResponse = data;
                expect(sellRequestResponse.toBeDefined());
                expect(sellRequestResponse.toEqual({
                    "_id": "5549719d8fbad77036cf4dca",
                    "user_id": "55496daff856259432cc594f",
                    "cash_balance": -4292.431392857145,
                    "__v": 29,
                    "stocks": []
                }));

                $httpBackend.flush();


            })

        }));
    });


});


describe('DashController', function() {
    var scope;


    beforeEach(angular.mock.module('socialStock'));
    beforeEach(angular.mock.inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('DashController', {
            $scope: scope
        });
    }));

    it('Dashcontroller scope variables should be initialized correctly', function() {
        expect(scope.portfolio).toBeUndefined();
        expect(scope.networth).toBeUndefined();
        expect(scope.refresh).toBeDefined();
        expect(scope.createAndSell).toBeDefined();
        spyOn(scope, 'refresh');
    })
});

describe('SearchController', function() {
    var scope;


    beforeEach(angular.mock.module('socialStock'));
    beforeEach(angular.mock.inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('SearchController', {
            $scope: scope
        });
    }));

    it('SearchController scope variables should be initialized correctly', function() {
        expect(scope.search).toBeDefined();
        expect(scope.buyStock).toBeDefined();



    })
});


describe('Routing', function () {
  var $route;
  beforeEach(module('socialStock'));

  beforeEach(inject(function($injector){
    $route = $injector.get('$route');
  }));

  it('Should have /dashboard route, template, and controller', function () {
    expect($route.routes['/dashboard']).to.be.ok();
    expect($route.routes['/dashboard'].controller).to.be('DashController');
    expect($route.routes['/dashboard'].templateUrl).to.be('app/dashboard/dashboard.html');
  });

  it('Should have /search route, template, and controller', function () {
    expect($route.routes['/search']).to.be.ok();
    expect($route.routes['/search'].controller).to.be('SearchController');
    expect($route.routes['/search'].templateUrl).to.be('app/search/search.html');
  });

  it('Should have /logout route, template, and controller', function () {
    expect($route.routes['/logout']).to.be.ok();
    expect($route.routes['/logout'].controller).to.be('AuthController');
    expect($route.routes['/logout'].templateUrl).to.be('app/auth/auth.html');
  });
});
