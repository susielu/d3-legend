
d3.svg.legend = function(){
  //default settings
  var  scale = d3.scale.linear()/*.domain([0,1]).range([0,1])*/,
  shape = "rect", //options rect circle or line
  shapeWidth = 15,
  shapeHeight = 15,
  shapePadding = 2,
  cells = 5,
  labels = [],
  attribute = "fill",
  labelFormat = d3.format(".01f"),
  orientation = "horizontal";

  var legend = function (svg){

    var l = svg.append("g").attr("class", "lCells").selectAll(".lCells"),
    type = scale.ticks ? linear() : scale.invertExtent ? quant() : ordinal();

    l.data(type.data)
      .enter()
      .append(shape)
      .attr("class", "lCell")
      .attr("height", shapeHeight)
      .attr("width", shapeWidth)
      .attr("transform", function(d,i){
        return "translate(0," + (i * (shapeWidth + shapePadding)) + ")"; })
      .call(type.fill)


    var t = svg.append("g").attr("class", "lLabels").selectAll(".lLabels");

    t.data(type.labels)
      .enter()
      .append("text")
      .attr("class", "lLabel")
      .attr("transform", function(d,i){
        return "translate(" + (shapeWidth + 10) + "," +
          ((i + .8) * (shapeWidth + shapePadding)) + ")"; })
      .text(function(d){ return d; })

  };

  function linear() {
    var data = [],
    domain = scale.domain(),
    increment = (domain[1] - domain[0])/(cells - 1),
    i;

    for (i=0; i < (cells); i++){
      data.push(labelFormat(domain[0] + i*increment));
    }

    return {data: data,
            labels: data,
            fill: function(el){
              fillOrClass(el, function(d){ return scale(d); })}};
  };

  function quant() {
    var labels = scale.range().map(function(d){
      var invert = scale.invertExtent(d);
      return labelFormat(invert[0]) + " to " + labelFormat(invert[1]);
    })
    return {data: scale.range(),
            labels: labels,
            fill: function(el){
              fillOrClass(el, function(d){ return d; })}};
  };

  function ordinal() {
    return {data: scale.domain(),
            labels: scale.domain(),
            fill: function(el){
              fillOrClass(el, function(d){ return scale(d); })}};
  };

  function fillOrClass(el, fill) {
    if (attribute === "fill"){
      el.style("fill", fill);
    } else {
      el.attr("class", fill);
    }
  }

  //updating settings
  legend.scale = function(_) {
    if (!arguments.length) return legend;
    scale = _;
    return legend;
  };

  legend.cells = function(_) {
    if (!arguments.length) return legend;
    if (_ >= 2){
      cells = _;
    }
    return legend;
  }

  // legend.shape = function(_) {
  //   if (!arguments.length) return legend;
  //   shape = _;
  //   return shape;
  // };

  legend.shapeWidth = function(_) {
    if (!arguments.length) return legend;
    shapeWidth = +_;
    return legend;
  };

  legend.shapeHeight = function(_) {
    if (!arguments.length) return legend;
    shapeHeight = +_;
    return legend;
  };

  legend.shapePadding = function(_) {
    if (!arguments.length) return legend;
    shapePadding = +_;
    return legend;
  };

  legend.textAlign = function(_) {
    if (!arguments.length) return legend;
    textAlign = _;
    return legend;
  };

  legend.labels = function(_) {
    if (!arguments.length) return legend;
    labels = _;
    return legend;
  };


  legend.labelFormat = function(_) {
    if (!arguments.length) return legend;
    labelFormat = _;
    return legend;
  };

  legend.attribute = function(_) {
    if (!arguments.length) return legend;
    if (_ == "fill" || _ == "class"){
      attribute = _;
    }
    return legend;
  };

  legend.orientation = function(_){
    if (!arguments.length) return legend;
    if (_ == "horizontal" || _ == "vertical") {
      orientation = _;
    }
    return legend;
  }

  return legend;
}