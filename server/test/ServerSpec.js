var expect = require('chai').expect;
var request = require('request');
var fs = require('fs');
var path = require('path');

/************************************************************/
// Mocha doesn't have a way to designate pending before blocks.
// Mimic the behavior of xit and xdescribe with xbeforeEach.
// Remove the 'x' from beforeEach block when working on
// authentication tests.
/************************************************************/
var xbeforeEach = function () {};
/************************************************************/


describe('Priviledged Access:', function () {

  it('Redirects to login page if a user tries to access / and is not signed in', function (done) {
    request('http://localhost:3000/', function (error, res, body) {
      expect(res.req.path).to.equal('/signin.html'); // /login
      done();
    });
  });

  it('Redirects to login page if a user tries to go to /index.html and is not signed in', function (done) {
    request('http://localhost:3000/index.html', function (error, res, body) {
      expect(res.req.path).to.equal('/signin.html');
      done();
    });
  });

  it('Portfolio api returns 401 if not signed in', function (done) {
    request('http://localhost:3000/api/portfolio', function (error, res, body) {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });

  it('Twitter api returns 401 if not signed in', function (done) {
    request('http://localhost:3000/api/twitter', function (error, res, body) {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });

  it('Users api returns 401 if not signed in', function (done) {
    request('http://localhost:3000/api/users', function (error, res, body) {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });

}); // 'Priviledged Access'