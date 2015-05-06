// This is a CasperJS script ($ casperjs casperTwit.js)

var fs = require('fs');
var casper = require('casper').create();

var top100 = JSON.parse(fs.read('top100.json'));
console.log('top 100: ', top100.data[0]);
var list = [];

var visitAndReport = function (i) {
  var url = 'http://twittercounter.com/' + top100.data[i].screen_name;
  if (i == 0) {
    casper.start(url);
  } else {
    casper.thenOpen(url)
  }

  casper.waitFor(function check() {
    return this.getCurrentUrl() ===  url
  }, function then() {
    this.echo("I'm in twittercounter at index: " + i);
    this.echo('screen name: ' + top100.data[i].screen_name);
    this.echo('title: ' + this.getTitle());
    this.echo('current URL: ' + this.getCurrentUrl());

    var response = this.evaluate(function () {
      return document.querySelector('#average .up').innerText;
    });
    response = response.replace(/\,/g, '').replace(/ /g, '');
    list.push({ screen_name: top100.data[i].screen_name, avgDelta: response});
    fs.write('deltas.json', JSON.stringify(list, null, '\t'), 'w');
    this.echo('count: ' + response);
  });


  casper.run();
}


for (var i = 0; i < top100.data.length; i++) {
  visitAndReport(i);


}