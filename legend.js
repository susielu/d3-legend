
d3.svg.legend = function() {
  //default settings
  var scale = d3.scale.linear(),
    shape = "rect", //options rect circle or line
    shapeWidth = 15, //think about these
    shapeHeight = 15, //think about these
    shapeRadius = 10,
    shapePadding = 2,
    cells = [5],
    labels = [],
    attribute = "fill",
    labelFormat = d3.format(".01f"),
    labelOffset = 10,
    orient = "vertical";

  function legend(svg){

    var type = scale.ticks ? linear() : scale.invertExtent ? quant() : ordinal();
    type.labels = mergeLabels(type.labels);

    var cell = svg.selectAll(".cell"),
      cellEnter = cell.data(type.data).enter().insert("g", ".lgdCells").attr("class", "cell"),
      shapeEnter = cellEnter.append(shape).attr("class", "swatch"),
      shapes = cellEnter.select(shape);

      //cellExit, needs to be added
      //cellUpdate, needs to be added

    //creates shape
    if (shape === "rect"){
        shapes.attr("height", shapeHeight).attr("width", shapeWidth);

    } else if (shape === "circle") {
        shapes.attr("r", shapeRadius).attr("cx", shapeRadius).attr("cy", 0);

    } else if (shape === "line") {
        shapes.attr("x1", 0).attr("x2", shapeWidth).attr("y1", 0).attr("y2", 0)
    }

    //adds text
    cellEnter.append("text").attr("class", "label");
    svg.selectAll("g.cell text").data(type.labels)
      .text(function(d) { return d; });

    // sets placement
    var swatchEnter = cellEnter.select(shape),
      textEnter = cellEnter.select("text"),
      size = swatchEnter[0].map(function(d){ return d.getBBox(); });

    if (orient === "vertical"){
      cellEnter.attr("transform",
        function(d,i) {
          return "translate(0, " + (i * (size[i].height + shapePadding)) + ")";
        });

      textEnter.attr("transform",
        function(d,i) {
          return "translate(" + (size[i].width + labelOffset) + "," +
            size[i].height * .75 + ")";
        });

    } else if (orient === "horizontal"){
      cellEnter.attr("transform",
        function(d,i) {
          return "translate(" + (i * (size[i].width + shapePadding)) + ",0)";
        });

      textEnter.attr("transform",
        function(d,i) {
          return "translate(" + size[i].width/2 + "," + (size[i].height +
              labelOffset + 5) + ")";
        })
        .style("text-anchor", "middle");
    }

    // sets color
    if (attribute === "fill"){
      swatchEnter.style("fill", type.fill);
    } else if (attribute === "class"){
      swatchEnter.attr("class", function(d){ return "swatch " + type.fill(d); });
    } else if (attribute === "stroke"){
      swatchEnter.style("stroke", type.fill);
    }

  }

  function mergeLabels(gen) {
    if(labels.length === 0) return gen;

    var i = labels.length;
    for (; i < gen.length; i++) {
      labels.push(gen[i]);
    }
    return labels;
  }

  function linear() {
    var data = [];

    if (cells.length > 1){
      data = cells;

    } else {
      var domain = scale.domain(),
      increment = (domain[1] - domain[0])/(cells - 1),
      i = 0;

      for (; i < cells; i++){
        data.push(labelFormat(domain[0] + i*increment));
      }

    }

    return {data: data,
            labels: data,
            fill: function(d){ return scale(d); }};
  }

  function quant() {
    var labels = scale.range().map(function(d){
      var invert = scale.invertExtent(d);
      return labelFormat(invert[0]) + " to " + labelFormat(invert[1]);
    });
    return {data: scale.range(),
            labels: labels,
            fill: function(d){ return d; }};
  }

  function ordinal() {
    return {data: scale.domain(),
            labels: scale.domain(),
            fill: function(d){ return scale(d); }};
  }

  //updating settings
  legend.scale = function(_) {
    if (!arguments.length) return legend;
    scale = _;
    return legend;
  };

  legend.cells = function(_) {
    if (!arguments.length) return legend;
    if (_.length > 1 || _ >= 2 ){
      cells = _;
    }
    return legend;
  };

  legend.shape = function(_) {
    if (!arguments.length) return legend;
    shape = _;
    return legend;
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

  legend.labelOffset = function(_) {
    if (!arguments.length) return legend;
    labelOffset = +_;
    return legend;
  };

  legend.attribute = function(_) {
    if (!arguments.length) return legend;
    if (_ == "fill" || _ == "class" || _ == "stroke"){
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