d3.legend = {};

function d3_identity(d) {
  return d;
};

function d3_mergeLabels(gen, labels) {

    if(labels.length === 0) return gen;

    gen = (gen) ? gen : [];

    var i = labels.length;
    for (; i < gen.length; i++) {
      labels.push(gen[i]);
    }
    return labels;
  }

function d3_linearLegend(scale, cells, labelFormat) {
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
          feature: function(d){ return scale(d); }};
}

function d3_quantLegend(scale, labelFormat) {
  var labels = scale.range().map(function(d){
    var invert = scale.invertExtent(d);
    return labelFormat(invert[0]) + " to " + labelFormat(invert[1]);
  });
  return {data: scale.range(),
          labels: labels,
          feature: d3_identity
        };
}

function d3_ordinalLegend(scale) {
  return {data: scale.domain(),
          labels: scale.domain(),
          feature: function(d){ return scale(d); }};
}

function d3_drawShapes(shape, shapes, shapeHeight, shapeWidth, shapeRadius, path) {
  if (shape === "rect"){
      shapes.attr("height", shapeHeight).attr("width", shapeWidth);

  } else if (shape === "circle") {
      shapes.attr("r", shapeRadius)//.attr("cx", shapeRadius).attr("cy", shapeRadius);

  } else if (shape === "line") {
      shapes.attr("x1", 0).attr("x2", shapeWidth).attr("y1", 0).attr("y2", 0);

  } else if (shape === "path") {
    shapes.attr("d", path);
  }
}

function d3_addText(svg, enter, labels){
  enter.append("text").attr("class", "label");
  svg.selectAll("g.cell text").data(labels).text(d3_identity);
}

function d3_calcType(scale, cells, labels, labelFormat){
  var type = scale.ticks ?
          d3_linearLegend(scale, cells, labelFormat) : scale.invertExtent ?
          d3_quantLegend(scale, labelFormat) : d3_ordinalLegend(scale);

  type.labels = d3_mergeLabels(type.labels, labels);

  return type;
}

function d3_placement(orient, cell, cellTrans, text, textTrans) {
  cell.attr("transform", cellTrans);
  text.attr("transform", textTrans);
  if (orient === "horizontal"){
    text.style("text-anchor", "middle");
  }
}


d3.legend.symbol = function(){

  var scale = d3.scale.linear(),
    shape = "path",
    shapeWidth = 15,
    shapeHeight = 15,
    shapeRadius = 10,
    shapePadding = 5,
    cells = [5],
    labels = [],
    useClass = false,
    labelFormat = d3.format(".01f"),
    labelOffset = 10,
    orient = "vertical";


    function legend(svg){

      var type = d3_calcType(scale, cells, labels, labelFormat);

      var cell = svg.selectAll(".cell").data(type.data),
        cellEnter = cell.enter().append("g", ".cell").attr("class", "cell").style("opacity", 1e-6);
        shapeEnter = cellEnter.append(shape).attr("class", "swatch"),
        shapes = cell.select("g.cell " + shape);

      //remove old shapes
      cell.exit().transition().style("opacity", 0).remove();

      d3_drawShapes(shape, shapes, shapeHeight, shapeWidth, shapeRadius, type.feature);
      d3_addText(svg, cellEnter, type.labels)

      // sets placement
      var text = cell.select("text"),
        shapeSize = shapes[0].map( function(d){ return d.getBBox(); });


      var maxH = d3.max(shapeSize, function(d){ return d.height; }),
      maxW = d3.max(shapeSize, function(d){ return d.width; });

      var cellTrans,
      textTrans;

      //positions cells and text
      if (orient === "vertical"){
        cellTrans = function(d,i) { return "translate(0, " + (i * (maxH + shapePadding)) + ")"; };
        textTrans = function(d,i) { return "translate(" + (maxW + labelOffset) + "," +
              (shapeSize[i].y + shapeSize[i].height/2 + 5) + ")"; };

      } else if (orient === "horizontal"){
        cellTrans = function(d,i) { return "translate(" + (i * (maxW + shapePadding)) + ",0)"; };
        textTrans = function(d,i) { return "translate(" + (shapeSize[i].width/2  + shapeSize[i].x) + "," +
              (maxH + labelOffset ) + ")"; };
      }

      d3_placement(orient, cell, cellTrans, text, textTrans);
      cell.transition().style("opacity", 1);

    }


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

  // legend.shape = function(_) {
  //   if (!arguments.length) return legend;
  //   shape = _;
  //   return legend;
  // };

  // legend.shapeWidth = function(_) {
  //   if (!arguments.length) return legend;
  //   shapeWidth = +_;
  //   return legend;
  // };

  // legend.shapeHeight = function(_) {
  //   if (!arguments.length) return legend;
  //   shapeHeight = +_;
  //   return legend;
  // };

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

  legend.orient = function(_){
    if (!arguments.length) return legend;
    _ = _.toLowerCase();
    if (_ == "horizontal" || _ == "vertical") {
      orient = _;
    }
    return legend;
  };



  return legend;

};

