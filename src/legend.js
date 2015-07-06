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
