import helper from './legend';
import { dispatch } from 'd3-dispatch';
import { scaleLinear } from 'd3-scale';
import { format } from 'd3-format';
import { sum } from 'd3-array';

export default function color(){

  var scale = scaleLinear(),
    shape = "rect",
    shapeWidth = 15,
    shapeHeight = 15,
    shapeRadius = 10,
    shapePadding = 2,
    cells = [5],
    labels = [],
    classPrefix = "",
    useClass = false,
    title = "",
    labelFormat = format(".01f"),
    labelOffset = 10,
    labelAlign = "middle",
    labelDelimiter = "to",
    orient = "vertical",
    ascending = false,
    path,
    legendDispatcher = dispatch("cellover", "cellout", "cellclick");

    function legend(svg){

      var type = helper.d3_calcType(scale, ascending, cells, labels, labelFormat, labelDelimiter),
        legendG = svg.selectAll('g').data([scale]);

      legendG.enter().append('g').attr('class', classPrefix + 'legendCells');

      var cell = svg.select('.' + classPrefix + 'legendCells')
          .selectAll("." + classPrefix + "cell").data(type.data),
        cellEnter = cell.enter().append("g")
          .attr("class", classPrefix + "cell"),//.merge(cell).style("opacity", 1e-6),
        shapeEnter = cellEnter.append(shape).attr("class", classPrefix + "swatch"),
        shapes = svg.selectAll("g." + classPrefix + "cell " + shape);

      //add event handlers
      helper.d3_addEvents(cellEnter, legendDispatcher);

      cell.exit().transition().style("opacity", 0).remove();

      helper.d3_drawShapes(shape, shapes, shapeHeight, shapeWidth, shapeRadius, path);


      helper.d3_addText( svg, cellEnter, type.labels, classPrefix)
      
      // we need to merge the selection, otherwise changes in the legend (e.g. change of orientation) are applied only to the new cells and not the existing ones.
      cell = cellEnter.merge(cell);

      // sets placement
      var text = svg.selectAll("g." + classPrefix + "cell text"),
        textSize = text.nodes().map( function(d){ return d.getBBox(); }),
        shapeSize = shapes.nodes().map( function(d){ return d.getBBox(); }),
        // Determine the width the cell needs to be to include the shape and text (for horizontal orientation)
        cellWidths = shapeSize.map( function(d, i){
          if (orient === "horizontal" && textSize[i].width > d.width) {
              return textSize[i].width
          } else {
              return d.width;
          }
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
        shapes.attr("class", function(d){ return classPrefix + "swatch " + type.feature(d); });
      }

      var cellTrans,
        shapeTrans,
        textTrans,
        textAlign = (labelAlign == "start") ? 0 : (labelAlign == "middle") ? 0.5 : 1;

      //positions cells and text
      if (orient === "vertical"){
        cellTrans = function(d,i) { return "translate(0, " + (i * (shapeSize[i].height + shapePadding)) + ")"; };
        textTrans = function(d,i) { return "translate(" + (shapeSize[i].width + shapeSize[i].x +
          labelOffset) + "," + (shapeSize[i].y + shapeSize[i].height/2 + 5) + ")"; };

      } else if (orient === "horizontal"){
        cellTrans = function(d,i) {
          var previousCellWidths = sum(cellWidths.slice(0, i));
          return "translate(" + (previousCellWidths + i * shapePadding) + ",0)";
        };
        shapeTrans = function(d,i) {
          var x = (cellWidths[i] - shapeSize[i].width) * textAlign;
          return "translate(" + x + ", 0)";
        };
        textTrans = function(d,i) { return "translate(" + (cellWidths[i] * textAlign) +
          "," + (shapeSize[i].height + shapeSize[i].y + labelOffset + 8) + ")"; };
      }

      helper.d3_placement(orient, cell, cellTrans, text, textTrans, labelAlign, shapes, shapeTrans);
      helper.d3_title(svg, title, classPrefix);

      cell.transition().style("opacity", 1);

    }



  legend.scale = function(_) {
    if (!arguments.length) return scale;
    scale = _;
    return legend;
  };

  legend.cells = function(_) {
    if (!arguments.length) return cells;
    if (_.length > 1 || _ >= 2 ){
      cells = _;
    }
    return legend;
  };

  legend.shape = function(_, d) {
    if (!arguments.length) return shape;
    if (_ == "rect" || _ == "circle" || _ == "line" || (_ == "path" && (typeof d === 'string')) ){
      shape = _;
      path = d;
    }
    return legend;
  };

  legend.shapeWidth = function(_) {
    if (!arguments.length) return shapeWidth;
    shapeWidth = +_;
    return legend;
  };

  legend.shapeHeight = function(_) {
    if (!arguments.length) return shapeHeight;
    shapeHeight = +_;
    return legend;
  };

  legend.shapeRadius = function(_) {
    if (!arguments.length) return shapeRadius;
    shapeRadius = +_;
    return legend;
  };

  legend.shapePadding = function(_) {
    if (!arguments.length) return shapePadding;
    shapePadding = +_;
    return legend;
  };

  legend.labels = function(_) {
    if (!arguments.length) return labels;
    labels = _;
    return legend;
  };

  legend.labelAlign = function(_) {
    if (!arguments.length) return labelAlign;
    if (_ == "start" || _ == "end" || _ == "middle") {
      labelAlign = _;
    }
    return legend;
  };

  legend.labelFormat = function(_) {
    if (!arguments.length) return labelFormat;
    labelFormat = typeof(_) === 'string' ? format(_) : _;
    return legend;
  };

  legend.labelOffset = function(_) {
    if (!arguments.length) return labelOffset;
    labelOffset = +_;
    return legend;
  };

  legend.labelDelimiter = function(_) {
    if (!arguments.length) return labelDelimiter;
    labelDelimiter = _;
    return legend;
  };

  legend.useClass = function(_) {
    if (!arguments.length) return useClass;
    if (_ === true || _ === false){
      useClass = _;
    }
    return legend;
  };

  legend.orient = function(_){
    if (!arguments.length) return orient;
    _ = _.toLowerCase();
    if (_ == "horizontal" || _ == "vertical") {
      orient = _;
    }
    return legend;
  };

  legend.ascending = function(_) {
    if (!arguments.length) return ascending;
    ascending = !!_;
    return legend;
  };

  legend.classPrefix = function(_) {
    if (!arguments.length) return classPrefix;
    classPrefix = _;
    return legend;
  };

  legend.title = function(_) {
    if (!arguments.length) return title;
    title = _;
    return legend;
  };

  legend.on = function(){
    var value = legendDispatcher.on.apply(legendDispatcher, arguments)
    return value === legendDispatcher ? legend : value;
  }

  return legend;

};
