// This is a CasperJS script ($ casperjs casperTwit.js)

var fs = require('fs');
var casper = require('casper').create();

var top100 = {};

var getTop100 = function () {
  var url = 'http://twittercounter.com/pages/100';
  casper.start(url);

  casper.waitFor(function check() {
    return this.getCurrentUrl() === url
  }, function then() {
    this.echo('current URL: ' + this.getCurrentUrl());

    var response = this.evaluate(function () {
      var items = [];
      var names = document.querySelectorAll('.name');
      var unames = document.querySelectorAll('.uname');
      var followers = document.querySelectorAll('.num-followers .num');
      for (var i = 0; i < 100; i++) {
        items.push({
          name: names[i].innerText,
          screen_name: unames[i] ? unames[i].innerText.replace('@', '') : "undefined",
          followers_count: followers[i] ? followers[i].innerText.replace(/\,/g, '') : "undefined"
        });
      }
      return items;
    });
    top100 = { date_scraped: new Date(), data: response };
    console.log(JSON.stringify(top100, null, '\t'));
    var dateString = (new Date()).toISOString().replace(/\:/g, '-');
    fs.write(dateString + 'top100.json', JSON.stringify(top100, null, '\t'), 'w');
    
  });
  casper.run();
}

getTop100();
