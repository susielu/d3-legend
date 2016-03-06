

//Color: Quantile #svg-color-quant

var svg = d3.select("#svg-color-quant");

var quantize = d3.scale.quantize()
    .domain([ 0, 0.15 ])
    .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

svg.append("g")
  .attr("class", "legendQuant")
  .attr("transform", "translate(20,20)");

var legend = d3.legend.color()
    .labelFormat(d3.format(".2f"))
    .useClass(true)
    .scale(quantize);

svg.select(".legendQuant")
  .call(legend);

//Color: Log #svg-color-log
var svg = d3.select("#svg-color-log");

var log = d3.scale.log()
    .domain([ 0.1, 100, 1000 ])
    .range(["rgb(46, 73, 123)", "rgb(71, 187, 94)"]);

svg.append("g")
  .attr("class", "legendLog")
  .attr("transform", "translate(20,20)");

var logLegend = d3.legend.color()
    .cells([0.1, 5, 10, 50, 100, 500, 1000])
    .scale(log);

svg.select(".legendLog")
  .call(logLegend);

//Color Linear #svg-color-linear
var linear = d3.scale.linear().domain([0,10]).range(["rgb(46, 73, 123)", "rgb(71, 187, 94)"]);

svg = d3.select("#svg-color-linear");

svg.append("g")
  .attr("class", "legendLinear")
  .attr("transform", "translate(20,20)");

var legendLinear = d3.legend.color()
    .shapeWidth(30)
    .orient('horizontal')
    .scale(linear);

//Color Linear #svg-color-linear-10
svg.select(".legendLinear")
  .call(legendLinear);

svg = d3.select("#svg-color-linear-10");

svg.append("g")
  .attr("class", "legendLinear")
  .attr("transform", "translate(20,20)");

legendLinear.cells(10);

svg.select(".legendLinear")
  .call(legendLinear);

//Linear #svg-color-linear-custom
svg.select(".legendLinear")
  .call(legendLinear);

svg = d3.select("#svg-color-linear-custom");

svg.append("g")
  .attr("class", "legendLinear")
  .attr("transform", "translate(20,20)");

legendLinear.cells([1, 2, 3, 6, 8]);

svg.select(".legendLinear")
  .call(legendLinear);


//Ordinal #svg-color-ordinal
var ordinal = d3.scale.ordinal()
  .domain(["a", "b", "c", "d", "e"])
  .range([ "rgb(153, 107, 195)", "rgb(56, 106, 197)", "rgb(93, 199, 76)", "rgb(223, 199, 31)", "rgb(234, 118, 47)"]);

svg = d3.select("#svg-color-ordinal");

svg.append("g")
  .attr("class", "legendOrdinal")
  .attr("transform", "translate(20,20)");

var legendOrdinal = d3.legend.color()
  .shape("path", d3.svg.symbol().type("triangle-up").size(150)())
  .shapePadding(10)
  .scale(ordinal);

svg.select(".legendOrdinal")
  .call(legendOrdinal);


//Size: Linear Circle #svg-size-linear
var linearSize = d3.scale.linear().domain([0,10]).range([10, 30]);

svg = d3.select("#svg-size-linear");

svg.append("g")
  .attr("class", "legendSize")
  .attr("transform", "translate(20, 40)");


var legendSize = d3.legend.size()
    .scale(linearSize)
    .shape('circle')
    .shapePadding(15)
    .labelOffset(20)
   .orient('horizontal');

svg.select(".legendSize")
  .call(legendSize);

//Size: Linear Line #svg-size-line
var lineSize = d3.scale.linear().domain([0,10]).range([2, 10]);

svg = d3.select("#svg-size-line");

svg.append("g")
  .attr("class", "legendSizeLine")
  .attr("transform", "translate(0, 20)");

var legendSizeLine = d3.legend.size()
      .scale(lineSize)
      .shape("line")
      .orient("horizontal")
      .labels(["tiny", "small", "medium", "large", "grand"])
      .shapeWidth(50)
      .labelAlign("start")
      .shapePadding(10);

svg.select(".legendSizeLine")
  .call(legendSizeLine);

//Symbol: Ordinal #svg-symbol-ordinal
svg = d3.select("#svg-symbol-ordinal");

svg.append("g")
  .attr("class", "legendSymbol")
  .attr("transform", "translate(20, 20)");

var triangleU = d3.svg.symbol().type('triangle-up')(),
  circle = d3.svg.symbol().type('circle')(),
  cross = d3.svg.symbol().type('cross')(),
  diamond = d3.svg.symbol().type('diamond')(),
  triangleD = d3.svg.symbol().type('triangle-down')();

//example output of d3.svg.symbol().type('circle')();
//"M0,4.51351666838205A4.51351666838205,4.51351666838205 0 1,1 0,
//-4.51351666838205A4.51351666838205,4.51351666838205 0 1,1 0,4.51351666838205Z"

var symbolScale =  d3.scale.ordinal()
  .domain(['a','b','c', 'd', 'e'])
  .range([ triangleU, circle, cross, diamond, triangleD] );

var legendPath = d3.legend.symbol()
  .scale(symbolScale)
  .orient("horizontal")
  .title('Symbol Legend Title')
  .on("cellclick", function(d){alert("clicked " + d);});

svg.select(".legendSymbol")
  .call(legendPath);