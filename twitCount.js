// This is a phantomJS script ($ phantomJS twitCount.js)

var page = require('webpage').create(),
  url = 'http://twittercounter.com/pages/100';

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
    console.log(JSON.stringify({ date_scraped: new Date(), data: results }, null, '\t'));
  }
  phantom.exit();
});