
 /*
File: Flot-Chart init js
*/

! function($) {
	"use strict";
	//var updateInterval = 1000;
	var FlotChart = function() {
		this.$body = $("body")
		this.$realData = []
		this.$realDataList = []
		this.$now = new Date().getTime();
		this.$updateInterval = 1000;
		//this.$option = {}
	};

	//returns some random data
	FlotChart.prototype.randomData = function() {
		var totalPoints = 100;
		if (this.$realData.length > 0 && this.$realData.length > 0) {
			this.$realData = this.$realData.slice(1);
		}
		// Do a random walk
		while (this.$realData.length < totalPoints) {

			var prev = this.$realData.length > 0 ? this.$realData[this.$realData.length - 1] : 50,
			    y = prev + Math.random() * 10 - 5;

			if (y < 0) {
				y = 0;
			} else if (y > 100) {
				y = 100;
			}

			this.$realData.push(y);
		}

		// Zip the generated y values with the x values
		var res = [];
		for (var i = 0; i < this.$realData.length; ++i) {
			res.push([i, this.$realData[i]])
		}
		return res;
	};
	

	FlotChart.prototype.randomDataEx = function(_realData) {
		var totalPoints = 100;
		if ( _realData.length > 0) {
			_realData = _realData.slice(1);
		}
		// Do a random walk
		while (_realData.length < totalPoints) {

			var prev = _realData.length > 0 ? _realData[_realData.length - 1] : 30,
			    y = prev + Math.random() * 10 - 5;

			if (y < 0) {
				y = 0;
			} else if (y > 100) {
				y = 100;
			}
			//if (y < 10 || y > 60 ) continue;
			_realData.push(y);
		}
		// Zip the generated y values with the x values
		return _realData;
	};

	FlotChart.prototype.randomList = function() {
		var itemCount=8;
		//var updateInterval = 1000;
		
		if (this.$realDataList.length == 0) {
			var _i =  0;
			for (_i = 0; _i < itemCount; _i++) {
				this.$realDataList.push([]);
			}
		}
		var res = [];
		var i = 0;
		var tempNow=this.$now
		//console.log(this.$updateInterval)
		while (this.$realDataList[i]) {
			this.$realDataList[i] = this.randomDataEx(this.$realDataList[i]);
			var _res = [];
			this.$now = tempNow
			for (var j = 0; j < this.$realDataList[i].length; ++j) {
				_res.push([
					//j
					this.$now+=this.$updateInterval
					, this.$realDataList[i][j]])
			}
			//console.log(_res)
			res.push(_res);
			i++;
		}
		this.$now=tempNow+this.$updateInterval
		return [{
			"label": "터빈 유압유 탱크",
			"color": '#ffffff',//"#51bff2",
			"data": res[0]
		},
		{
			"label": "터빈 윤활유 탱크",
			"color": "#71b6f9",
			"data": res[1]
		},
		{
			"label": "터빈 베어링",
			"color": "#5b69bc",
			"data": res[2]
		},
		{
			"label": "터빈 베어링",
			"color": "#ff8acc",
			"data": res[3]
		},
		{
			"label": "발전기 본체",
			"color": "#fd7e14",
			"data": res[4]
		},
		{
			"label": "수소 공급 설비",
			"color": "#f9c851",
			"data": res[5]
		},
		{
			"label": "공급 배관",
			"color": "#10c469",
			"data": res[6]
		},
		{
			"label": "케이블",
			"color": "#35b8e0",
			"data": res[7]
		},
		{
			"label": "Floor",
			"color": "#6c757d",
			"data": res[8]
		}]
	};
	FlotChart.prototype.option = {
		colors : ['#4a8ef1','#71b6f9'],
		series : {
			grow : {
				active : false
			}, //disable auto grow
			shadowSize : 0, // drawing is faster without shadows
			lines : {
				show : true,
				fill : false,
				lineWidth : 1.2,
				steps : false
			}
		},
		grid : {
			show : true,
			aboveData : false,
			color : '#dcdcdc',
			labelMargin : 15,
			axisMargin : 0,
			borderWidth : 0,
			borderColor : null,
			minBorderMargin : 5,
			clickable : true,
			hoverable : true,
			autoHighlight : false,
			mouseActiveRadius : 20,
			// markingsStyle: 'dashed',
			// dashes: { show: true, steps:true },
			markings: [{ yaxis: { from: 80, to: 80 }, color: '#ff5b5b', lineWidth : 1 }
								// ,{ yaxis: { from: 80, to: 80 }, color: '#fd7e14', lineWidth : 1 }
								// ,{ yaxis: { from: 70, to: 70 }, color: '#f9c851', lineWidth : 1 }
								]			
		},
		tooltip : true, //activate tooltip
		tooltipOpts : {
			content : "%y.0" + "%",
			shifts : {
				x : -30,
				y : -50
			}
		},
		yaxis : {
			min : 0,
			max : 100,
			tickColor : 'rgba(173, 181, 189, 0.1)',
			font : {
				color : '#98a6ad'
			}
		},
		xaxis : {
			show : true,
			tickColor : 'rgba(173, 181, 189, 0.1)',
			font : {
				color : '#98a6ad'
			},
			mode: "time",
			tickSize: [1,"second"],
			tickFormatter: function(v, axis) {
				var date = new Date(v);

				if (date.getSeconds() % 10 == 0) {
						var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
						var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
						var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
 
						return hours + ":" + minutes + ":" + seconds;
				} else {
						return "";
				}
			},
			// timeformat: "%H:%M:%S",
			// timeBase: "milliseconds",
			axisLabel: "Time",
			axisLabelUseCanvas: true,
			axisLabelFontSizePixels: 12,
			axisLabelFontFamily: 'Verdana, Arial',
			axisLabelPadding: 10
		},
		legend: {
			show: true,
			position: 'ne',
			margin: [0,-60],
			backgroundColor: null,
			backgroundOpacity: 0.1,
			color: '#ffffff',
			noColumns: 5
		}
	};
	FlotChart.prototype.createRealTimeGraph = function(selector, data, option) {
		var plot = $.plot(selector, data, 
			option
		);
		return plot;
	};

	//initializing various charts and components
	FlotChart.prototype.init = function(chartId) {
		//real time data representation
			var plot = this.createRealTimeGraph(chartId, this.randomList(), this.option
				 );
			plot.draw();
			var $this = this;
			function updatePlot() {
				//plot.setData([$this.randomData()]);
				// plot.setOption(

				// );
				plot.setData(
					$this.randomList()
				);
				plot.setupGrid();
				// Since the axes don't change, we don't need to call plot.setupGrid()
				plot.draw();
				setTimeout(updatePlot, $('html').hasClass('mobile-device') ? 2000 : 2000);
			}

			updatePlot();
	};

	//init flotchart
	$.FlotChart = new FlotChart;
	$.FlotChart.Constructor =	FlotChart
}(window.jQuery);

//initializing flotchart
function($) {
	"use strict";
	if  ($("#flotRealTime").length > 0) {
		$.FlotChart.init("#flotRealTime")
		//setTimeout($.FlotChart.init("#flotRealTime2"), 10000);		
	}
}(window.jQuery);



