// This is a phantomJS script ($ phantomJS twitCount.js)
var fs = require('fs');

var page = require('webpage').create(),
  url = 'http://twittercounter.com/pages/100';

var getAvgDelta = function (data, i, collection) {
  url = "http://twittercounter.com/" + data[i].screen_name;
  console.log('getAvgDelta ', url);
  page.open(url, function (status) {
    if (status !== 'success') {
      console.log('Unable to access network', url);
    } else {
      var results = page.evaluate(function () {
        return document.querySelector('#average .up').innerText;
      });
      // data.delta = results;
      data[i].avgDelta = results.replace(' ', '').replace(/\,/g, '');
      data[i].avgDelta = 'test frank';
      data[i].foo = "bar";
      collection.push({
        screen_name: data[i].screen_name,
        avgDelta: results.replace(' ', '').replace(/\,/g, '')
      });

      if (i === 2) {
        fs.write('deltas.json', JSON.stringify(collection, null, '\t'), 'w');
      }
      console.log('WITH DELTA: ', JSON.stringify(collection, null, '\t'));
    }
  });
};

page.open(url, function (status) {
  if (status !== 'success') {
    console.log('Unable to access network');
  } else {
    var results = page.evaluate(function () {

      var names = document.querySelectorAll('.name'),
        items = [],
        i;
      var unames = document.querySelectorAll('.uname');
      var followers = document.querySelectorAll('.num-followers .num');
      for (i = 0; i < names.length; i++) {
        items.push({
          name: names[i].innerText,
          screen_name: unames[i] ? unames[i].innerText.replace('@', '') : "undefined",
          followers_count: followers[i] ? followers[i].innerText.replace(/\,/g, '') : "undefined"
        });
      }
      items.unames = unames;
      console.log('list length: ', names.length);
      return items;
    });
    var collection = [];
    for (var i = 0; i < 1; i++) {
      
          getAvgDelta(results, i, collection);

    }
    fs.write('newTop100.json', JSON.stringify({
      date_scraped: new Date(),
      data: results
    }, null, '\t'), 'w');
  }
  //phantom.exit();
});