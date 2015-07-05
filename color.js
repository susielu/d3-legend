
d3.legend.color = function(){

  var scale = d3.scale.linear(),
    shape = "rect",
    shapeWidth = 15,
    shapeHeight = 15,
    shapeRadius = 10,
    shapePadding = 2,
    cells = [5],
    labels = [],
    useClass = false,
    labelFormat = d3.format(".01f"),
    labelOffset = 10,
    orient = "vertical";


    function legend(svg){

      var type = scale.ticks ?
          d3_linearLegend(scale, cells, labelFormat) : scale.invertExtent ?
          d3_quantLegend(scale, labelFormat) : d3_ordinalLegend(scale);
      type.labels = d3_mergeLabels(type.labels, labels);

      var cell = svg.selectAll(".cell").data(type.data),
        cellEnter = cell.enter().append("g", ".cell").attr("class", "cell").style("opacity", 1e-6);
        shapeEnter = cellEnter.append(shape).attr("class", "swatch"),
        shapes = cell.select("g.cell " + shape).data(type.data);

      //remove old shapes
      cell.exit().transition().style("opacity", 0).remove();

      //creates shape
      d3_drawShapes(shape, shapes, shapeHeight, shapeWidth, shapeRadius);

      //adds text
      cellEnter.append("text").attr("class", "label");
      svg.selectAll("g.cell text").data(type.labels)
        .text(function(d) { return d; });

      // sets placement
      var  text = cell.select("text"),
        shapeSize = shapes[0].map(
          function(d, i){
            return d.getBBox();
        });


      //sets scale
      //everything is fill except for line which is stroke,
      if (!useClass){
        if (shape == "line"){
          shapes.style("stroke", type.feature);
        } else {
          shapes.style("fill", type.feature);
        }
      } else {
        shapes.attr("class", function(d){ return "swatch " + type.feature(d); });
      }

      //positions cells
      if (orient === "vertical"){
        cell.attr("transform",
          function(d,i) {
            return "translate(0, " + (i * (shapeSize[i].height + shapePadding)) + ")";
          })
         .transition().style("opacity", 1);

        text.attr("transform",
          function(d,i) {
            return "translate(" + (shapeSize[i].width + labelOffset) + "," +
              shapeSize[i].height * .75 + ")";
          });

      } else if (orient === "horizontal"){
        cell.attr("transform",
          function(d,i) {
            return "translate(" + (i * (shapeSize[i].width + shapePadding)) + ",0)";
          })
         .transition().style("opacity", 1);

        text.attr("transform",
          function(d,i) {
            return "translate(" + shapeSize[i].width/2 + "," + (shapeSize[i].height +
                labelOffset + 8) + ")";
          })
          .style("text-anchor", "middle");
      }
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

  legend.useClass = function(_) {
    if (!arguments.length) return legend;
    if (_ === true || _ === false){
      useClass = _;
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
  };

  return legend;

};

