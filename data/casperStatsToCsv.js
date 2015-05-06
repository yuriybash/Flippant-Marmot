// This is a CasperJS script ($ casperjs casperTwit.js)

var fs = require('fs');
var casper = require('casper').create();

var top100 = JSON.parse(fs.read('top100Stats.json'));
var data = top100.data;

var content = [];
var line;
for (var i = 0; i < data.length; i++) {
	line = [];
	line.push(data[i].name);
	line.push(data[i].screen_name);
	line.push(data[i].followers_count);
	line.push(data[i].avgDelta.replace('+', ''));
	content.push(line.join(', ')); 
}

fs.write('top100Stats.csv', content.join('\n'), 'w');