//var pie = new d3pie("pieChart", );
//
var pieColors = ["#5270B6","#30426B","#192236","#354976","#0C5D91","#062D46","#06345","#cb2121","#830909","#923e99","#ae83d5","#bf273e","#ce2aeb","#bca44a","#618d1b","#1ee67b","#b0ec44","#a4a0c9","#322849","#86f71a","#d1c87f","#7d9058","#44b9b0","#7c37c0","#cc9fb1","#e65414","#8b6834","#248838"];

var pieConfig = {
	"footer": {
		"color": "#999999",
		"fontSize": 10,
		"font": "roboto",
		"location": "bottom-left"
	},
	"size": {
		"canvasHeight": 600,
		"canvasWidth": 800,
		"pieInnerRadius": "33%",
		"pieOuterRadius": "60%"
	},
	"data": {
		"sortOrder": "value-desc",
		"smallSegmentGrouping": {
			"enabled": true,
			"value": 2
		},
		"content": [
			{
				"label": "FoxPro",
				"value": 32170,
				"color": "#248838"
			}
		]
	},
	"labels": {
		"outer": {
			"pieDistance": 32
		},
		"inner": {
			"hideWhenLessThanPercentage": 6,
			"fontSize": 16
		},
		"mainLabel": {
			"fontSize": 16
		},
		"percentage": {
			"color": "#ffffff",
			"fontSize": 18,
			"decimalPlaces": 0
		},
		"value": {
			"color": "#adadad",
			"fontSize": 16
		},
		"lines": {
			"enabled": true
		},
		"truncation": {
			"enabled": true
		}
	},
	"tooltips": {
		"enabled": true,
		"type": "placeholder",
		"string": "{label}: {value}, {percentage}%"
	},
	"effects": {
		"pullOutSegmentOnClick": {
			"effect": "linear",
			"speed": 400,
			"size": 8
		}
	},
	"misc": {
		"gradient": {
			"enabled": false,
			"percentage": 100
		}
	}
};