$(document).ready(function(){
	var svg_location = "#last-statement-chart";
var width = $(document).width()/1.5;
var height = width/2;

var fill = d3.scale.category20();

var words = {'im': 104, 'father': 65, 'ready': 69, 'love': 549, 'hope': 102, 'make': 31, 'come': 49, 'friends': 51, 'thank': 206, 'm': 30, 'peace': 86, 'row': 30, 'time': 45, 'innocent': 36, 'tell': 99, 'jesus': 84, 'us': 56, 'may': 41, 'like': 154, 'know': 251, 'didnt': 35, 'life': 112, 'sir': 42, 'cant': 37, 'please': 53, '’': 127, 'family': 250, 'give': 81, 'god': 162, 'stay': 51, 'much': 38, 'today': 28, 'sorry': 194, 'mom': 36, 'bless': 36, 'things': 29, 'got': 41, 'first': 37, 'forgive': 119, 'everyone': 38, 'still': 31, 'keep': 55, 'one': 97, 'see': 94, 'said': 31, 'thats': 60, 'way': 37, 'strong': 69, 'years': 53, 'back': 45, 'lot': 30, 'pray': 50, 'yall': 127, 'something': 28, 'pain': 52, 'home': 56, 'nothing': 38, 'loved': 34, 'yes': 97, 'lord': 124, 'take': 99, 'death': 70, 'sister': 28, 'ask': 79, 'people': 80, 'care': 52, 'allah': 35, 'find': 50, 'statement': 28, 'right': 52, 'say': 139, 'heaven': 34, 'would': 169, 'never': 42, 'heart': 64, 'ill': 35, 'ok': 27, 'forgiveness': 49, 'everything': 39, 'could': 43, 'christ': 45, 'go': 61, 'dont': 92, 'man': 55, 'always': 41, 'want': 189, 'let': 57, 'day': 33, 'going': 104, 'done': 81, 'apologize': 35, 'support': 32, 'son': 27, 'warden': 84, 'good': 31, 'ive': 28, 'everybody': 61, 'caused': 40, 'get': 57, 'wish': 29};

var word_entries = d3.entries(words);

var xScale = d3.scale.linear()
           .domain([0, d3.max(word_entries, function(d) {
              return d.value;
            })
           ])
           .range([10,100]);

d3.layout.cloud().size([width, height])
  .timeInterval(20)
  .words(word_entries)
  .fontSize(function(d) { return xScale(+d.value); })
  .text(function(d) { return d.key; })
  .rotate(function() { return ~~(Math.random() * 2) * 90; })
  .font("Impact")
  .on("end", draw)
  .start();

function draw(words) {
  d3.select(svg_location).append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")
    .selectAll("text")
      .data(words)
    .enter().append("text")
      .style("font-size", function(d) { return xScale(d.value) + "px"; })
      .style("font-family", "Impact")
      .style("fill", function(d, i) { return fill(i); })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.key; });
}

d3.layout.cloud().stop();




(function(d3) {
        'use strict';

        var dataset = [
          { label: 'positive', count: 113 }, 
          { label: 'negative', count: 292 }
        ];

        var width = 360;
        var height = 360;
        var radius = Math.min(width, height) / 2;
        var donutWidth = 75;                            // NEW

        var color = ['#7fbfff', '#FF7F7F'];

        var svg = d3.select('#sentiment-donut-chart')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');

        var arc = d3.svg.arc()
          .innerRadius(radius - donutWidth)             // NEW
          .outerRadius(radius);
          
        var pie = d3.layout.pie()
          .value(function(d) { return d.count; })
          .sort(null);

        var path = svg.selectAll('path')
          .data(pie(dataset))
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function(d, i) { 
            return color[i];
          });
        var legendRectSize = 18;
		var legendSpacing = 4;
        var legend = svg.selectAll('.legend')
		  .data(['positive', 'negative'])
		  .enter()
		  .append('g')
		  .attr('class', 'legend')
		  .attr('transform', function(d, i) {
		    var height = legendRectSize + legendSpacing;
		    var offset =  height * ['positive', 'negative'].length / 2;
		    var horz = -2 * legendRectSize;
		    var vert = i * height - offset;
		    return 'translate(' + horz + ',' + vert + ')';
		  });

		legend.append('rect')
			  .attr('width', legendRectSize)
			  .attr('height', legendRectSize)
			  .style('fill', function(d,i){return color[i]})
			  .style('stroke', function(d,i){return color[i]});
		legend.append('text')
		  .attr('x', legendRectSize + legendSpacing)
		  .attr('y', legendRectSize - legendSpacing)
		  .text(function(d) { return d; });

      })(window.d3);

// firstnames
 var svg2_location = "#first-names-chart";
var width = $(document).width()/1.5;
var height = width/2;

var fill = d3.scale.category20();

var words = {'Expected': 1.0, 'Larry': 2.01781944045, 'Willie': 3.00842281428, 'Johnny':3.85939086642, 'Bobby':2.67507149687, 'Billy':2.16211560786, 'Earl':3.36550554113, 'Jose':2.45503391114, 'Ricky':2.83909266782, 'Derrick':5.14952226758}
var word_entries = d3.entries(words);

var xScale2 = d3.scale.linear()
           .domain([0, d3.max(word_entries, function(d) {
              return d.value;
            })
           ])
           .range([10,100]);

d3.layout.cloud().size([width, height])
  .timeInterval(20)
  .words(word_entries)
  .fontSize(function(d) { return xScale2(+d.value); })
  .text(function(d) { return d.key; })
  .rotate(function() { return ~~(Math.random() * 2) * 90; })
  .font("Impact")
  .on("end", draw2)
  .start();

function draw2(words) {
  d3.select(svg2_location).append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")
    .selectAll("text")
      .data(words)
    .enter().append("text")
      .style("font-size", function(d) { return xScale2(d.value) + "px"; })
      .style("font-family", "Impact")
      .style("fill", function(d, i) { return fill(i); })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.key; });
}

d3.layout.cloud().stop();

// race donut

var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

var color = d3.scale.category20();

var pie = d3.layout.pie()
    .value(function(d) { return d.apples; })
    .sort(null);

var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 20);

var svg = d3.select("#race-donut").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.csv("sample.csv", type, function(error, data) {
  var path = svg.datum(data).selectAll("path")
      .data(pie)
    .enter().append("path")
      .attr("fill", function(d, i) { return color(i); })
      .attr("d", arc)
      .each(function(d) { this._current = d; }); // store the initial angles

  d3.selectAll("input.race")
      .on("change", change);

  var timeout = setTimeout(function() {
    d3.select("input[value=\"oranges\"]").property("checked", true).each(change);
  }, 2000);

  function change() {
    var value = this.value;
    clearTimeout(timeout);
    pie.value(function(d) { return d[value]; }); // change the value function
    path = path.data(pie); // compute the new angles
    path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
  }
});

function type(d) {
  d.apples = +d.apples;
  d.oranges = +d.oranges;
  return d;
}

// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}

	var legendRectSize = 18;
		var legendSpacing = 4;
        var legend = svg.selectAll('.legend')
		  .data(['white_white', 'white_black', 'black_white', 'black_black'])
		  .enter()
		  .append('g')
		  .attr('class', 'legend')
		  .attr('transform', function(d, i) {
		    var height = legendRectSize + legendSpacing;
		    var offset =  height * ['positive', 'negative'].length / 2;
		    var horz = -2 * legendRectSize;
		    var vert = i * height - offset;
		    return 'translate(' + horz + ',' + vert + ')';
		  });

		legend.append('rect')
			  .attr('width', legendRectSize)
			  .attr('height', legendRectSize)
			  .style('fill', function(d,i){return color(i)})
			  .style('stroke', function(d,i){return color(i)});
		legend.append('text')
		  .attr('x', legendRectSize + legendSpacing)
		  .attr('y', legendRectSize - legendSpacing)
		  .text(function(d) { return d; });

// sex donut

var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

var color = d3.scale.category20();

var pie = d3.layout.pie()
    .value(function(d) { return d.apples; })
    .sort(null);

var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 20);

var svg2 = d3.select("#sex-donut").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.csv("sexhom.csv", type, function(error, data) {
  var path = svg2.datum(data).selectAll("path")
      .data(pie)
    .enter().append("path")
      .attr("fill", function(d, i) { return color(i); })
      .attr("d", arc)
      .each(function(d) { this._current = d; }); // store the initial angles

  d3.selectAll("input.sex")
      .on("change", change2);

  var timeout = setTimeout(function() {
    d3.select("input[value=\"oranges\"]").property("checked", true).each(change);
  }, 2000);

  function change2() {
    var value = this.value;
    clearTimeout(timeout);
    pie.value(function(d) { return d[value]; }); // change the value function
    path = path.data(pie); // compute the new angles
    path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
  }
});

function type(d) {
  d.apples = +d.apples;
  d.oranges = +d.oranges;
  return d;
}

// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}

	var legendRectSize = 18;
		var legendSpacing = 4;
        var legend = svg2.selectAll('.legend')
		  .data(['male_male', 'male_female', 'female_male', 'female_female'])
		  .enter()
		  .append('g')
		  .attr('class', 'legend')
		  .attr('transform', function(d, i) {
		    var height = legendRectSize + legendSpacing;
		    var offset =  height * ['positive', 'negative'].length / 2;
		    var horz = -2 * legendRectSize;
		    var vert = i * height - offset;
		    return 'translate(' + horz + ',' + vert + ')';
		  });

		legend.append('rect')
			  .attr('width', legendRectSize)
			  .attr('height', legendRectSize)
			  .style('fill', function(d,i){return color(i)})
			  .style('stroke', function(d,i){return color(i)});
		legend.append('text')
		  .attr('x', legendRectSize + legendSpacing)
		  .attr('y', legendRectSize - legendSpacing)
		  .text(function(d) { return d; });




})