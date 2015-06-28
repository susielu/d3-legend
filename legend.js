
d3.svg.legend = function() {
  //default settings
  var scale = d3.scale.linear(),
    shape = "rect", //options rect circle or line
    shapeWidth = 15, //think about these
    shapeHeight = 15, //think about these
    shapeRadius = 10,
    shapePadding = 2,
    cells = [5], //array or value?
    labels = [],
    attribute = "fill",
    labelFormat = d3.format(".01f"),
    labelOffset = 10,
    orient = "vertical";

  function legend(svg){

    var type = scale.ticks ? linear() : scale.invertExtent ? quant() : ordinal(),
      cell = svg.selectAll(".cell").data(type.data),
      cellEnter = cell.enter().insert("g", ".lgdCells").attr("class", "cell");
      //cellExit,
      //cellUpdate

    //cellEnter.append(shape).attr("class", "swatch")

    if (shape === "rect"){
      cellEnter.append("rect").attr("class", "swatch")
        .attr("height", shapeHeight) //think about this more turn into if statement
        .attr("width", shapeWidth);

    } else if (shape === "circle") {
      cellEnter.append("circle").attr("class", "swatch")
        .attr("r", shapeRadius) //think about this more turn into if statement
        .attr("cx", shapeRadius)
        .attr("cy", 0);

    } else {

    }


    cellEnter.append("text").attr("class", "label")
      .text(function(d) { return d; });

    var swatchEnter = cellEnter.select(shape),
      textEnter = cellEnter.select("text"),
      size = swatchEnter[0].map(function(d){ return d.getBBox(); });

    // sets placement
    if (orient === "vertical"){
      cellEnter.attr("transform",
        function(d,i) {
          console.log(d)
          return "translate(0, " + (i * (size[i].height + shapePadding)) + ")";
        })

      textEnter.attr("transform",
        function(d,i) {
          return "translate(" + (size[i].width + labelOffset) + "," +
            shapeHeight * .75 + ")";
        })
    } else if (orient === "horizontal"){
      cellEnter.attr("transform",
        function(d,i) {
          return "translate(" + (i * (size[i].width + shapePadding)) + ",0)";
        })

      textEnter.attr("transform",
        function(d,i) {
          return "translate(" + size[i].width/2 + "," + (size[i].height +
              labelOffset + 5) + ")";
        })
        .style("text-anchor", "middle")
    }

    // sets color
    if (attribute === "fill"){
      swatchEnter.style("fill", type.fill)
    } else {
      swatchEnter.attr("class", function(d){ return "swatch " + type.fill(d); });
    }

  };

  function linear() {
    var data = [],
    domain = scale.domain(),
    increment = (domain[1] - domain[0])/(cells - 1),
    i = 0;

    for (; i < cells; i++){
      data.push(labelFormat(domain[0] + i*increment));
    }

    return {data: data,
            labels: data,
            fill: function(d){ return scale(d); }};
  };

  function quant() {
    var labels = scale.range().map(function(d){
      var invert = scale.invertExtent(d);
      return labelFormat(invert[0]) + " to " + labelFormat(invert[1]);
    })
    return {data: scale.range(),
            labels: labels,
            fill: function(d){ return d; }};
  };

  function ordinal() {
    return {data: scale.domain(),
            labels: scale.domain(),
            fill: function(d){ return scale(d); }};
  };

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

  legend.shape = function(_) {
    if (!arguments.length) return legend;
    shape = _;
    return shape;
  };

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

  legend.orient = function(_){
    if (!arguments.length) return legend;
    _ = _.toLowerCase();
    if (_ == "horizontal" || _ == "vertical") {
      orient = _;
    }
    return legend;
  }

  return legend;
}