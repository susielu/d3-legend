import helper from "./legend"
import { dispatch } from "d3-dispatch"
import { scaleLinear } from "d3-scale"
import { formatLocale, formatSpecifier } from "d3-format"

import { sum } from "d3-array"

export default function color() {
  let scale = scaleLinear(),
    shape = "rect",
    shapeWidth = 15,
    shapeHeight = 15,
    shapeRadius = 10,
    shapePadding = 2,
    cells = [5],
    cellFilter,
    labels = [],
    classPrefix = "",
    useClass = false,
    title = "",
    locale = helper.d3_defaultLocale,
    specifier = helper.d3_defaultFormatSpecifier,
    labelOffset = 10,
    labelAlign = "middle",
    labelDelimiter = helper.d3_defaultDelimiter,
    labelWrap,
    orient = "vertical",
    ascending = false,
    path,
    titleWidth,
    legendDispatcher = dispatch("cellover", "cellout", "cellclick")

  function legend(svg) {
    const type = helper.d3_calcType(
        scale,
        ascending,
        cells,
        labels,
        locale.format(specifier),
        labelDelimiter
      ),
      legendG = svg.selectAll("g").data([scale])

    legendG
      .enter()
      .append("g")
      .attr("class", classPrefix + "legendCells")

    if (cellFilter) {
      helper.d3_filterCells(type, cellFilter)
    }

    let cell = svg
      .select("." + classPrefix + "legendCells")
      .selectAll("." + classPrefix + "cell")
      .data(type.data)

    const cellEnter = cell
      .enter()
      .append("g")
      .attr("class", classPrefix + "cell")
    cellEnter.append(shape).attr("class", classPrefix + "swatch")

    let shapes = svg
      .selectAll(
        "g." + classPrefix + "cell " + shape + "." + classPrefix + "swatch"
      )
      .data(type.data)

    //add event handlers
    helper.d3_addEvents(cellEnter, legendDispatcher)

    cell
      .exit()
      .transition()
      .style("opacity", 0)
      .remove();
    
    shapes
      .exit()
      .transition()
      .style("opacity", 0)
      .remove();

    shapes = shapes.merge(shapes);
    // we need to merge the selection, otherwise changes in the legend (e.g. change of orientation) are applied only to the new cells and not the existing ones.
    cell = cellEnter.merge(cell);

    helper.d3_drawShapes(
      shape,
      shapes,
      shapeHeight,
      shapeWidth,
      shapeRadius,
      path
    );
    
    helper.d3_addText(
      svg,
      cellEnter,
      type.labels,
      classPrefix,
      labelWrap
    )
    .then(text => {

      // sets placement
      const textSize = text.nodes().map(d => d.getBBox()),
        shapeSize = shapes.nodes().map(d => d.getBBox());
      //sets scale
      //everything is fill except for line which is stroke,
      if (!useClass) {
        if (shape == "line") {
          shapes.style("stroke", type.feature)
        } else {
          shapes.style("fill", type.feature)
        }
      } else {
        shapes.attr("class", d => `${classPrefix}swatch ${type.feature(d)}`)
      }

      let cellTrans,
        textTrans,
        textAlign = labelAlign == "start" ? 0 : labelAlign == "middle" ? 0.5 : 1

      //positions cells and text
      if (orient === "vertical") {
        const cellSize = textSize.map((d, i) =>
          Math.max(d.height, shapeSize[i].height)
        )

        cellTrans = (d, i) => {
          const height = sum(cellSize.slice(0, i))
          return `translate(0, ${height + i * shapePadding})`
        }

        textTrans = (d, i) =>
          `translate( ${shapeSize[i].width +
            shapeSize[i].x +
            labelOffset}, ${shapeSize[i].y + shapeSize[i].height / 2 + 5})`
      } else if (orient === "horizontal") {
        cellTrans = (d, i) =>
          `translate(${i * (shapeSize[i].width + shapePadding)},0)`
        textTrans = (d, i) => `translate(${shapeSize[i].width * textAlign +
          shapeSize[i].x},
            ${shapeSize[i].height + shapeSize[i].y + labelOffset + 8})`
      }

      helper.d3_placement(orient, cell, cellTrans, text, textTrans, labelAlign)
      helper.d3_title(svg, title, classPrefix, titleWidth)

      cell.transition().style("opacity", 1)
    })
  }

  legend.scale = function(_) {
    if (!arguments.length) return scale
    scale = _
    return legend
  }

  legend.cells = function(_) {
    if (!arguments.length) return cells
    if (_.length > 1 || _ >= 2) {
      cells = _
    }
    return legend
  }

  legend.cellFilter = function(_) {
    if (!arguments.length) return cellFilter
    cellFilter = _
    return legend
  }

  legend.shape = function(_, d) {
    if (!arguments.length) return shape
    if (
      _ == "rect" ||
      _ == "circle" ||
      _ == "line" ||
      (_ == "path" && typeof d === "string")
    ) {
      shape = _
      path = d
    }
    return legend
  }

  legend.shapeWidth = function(_) {
    if (!arguments.length) return shapeWidth
    shapeWidth = +_
    return legend
  }

  legend.shapeHeight = function(_) {
    if (!arguments.length) return shapeHeight
    shapeHeight = +_
    return legend
  }

  legend.shapeRadius = function(_) {
    if (!arguments.length) return shapeRadius
    shapeRadius = +_
    return legend
  }

  legend.shapePadding = function(_) {
    if (!arguments.length) return shapePadding
    shapePadding = +_
    return legend
  }

  legend.labels = function(_) {
    if (!arguments.length) return labels
    labels = _
    return legend
  }

  legend.labelAlign = function(_) {
    if (!arguments.length) return labelAlign
    if (_ == "start" || _ == "end" || _ == "middle") {
      labelAlign = _
    }
    return legend
  }

  legend.locale = function(_) {
    if (!arguments.length) return locale
    locale = formatLocale(_)
    return legend
  }

  legend.labelFormat = function(_) {
    if (!arguments.length) return legend.locale().format(specifier)
    specifier = formatSpecifier(_)
    return legend
  }

  legend.labelOffset = function(_) {
    if (!arguments.length) return labelOffset
    labelOffset = +_
    return legend
  }

  legend.labelDelimiter = function(_) {
    if (!arguments.length) return labelDelimiter
    labelDelimiter = _
    return legend
  }

  legend.labelWrap = function(_) {
    if (!arguments.length) return labelWrap
    labelWrap = _
    return legend
  }

  legend.useClass = function(_) {
    if (!arguments.length) return useClass
    if (_ === true || _ === false) {
      useClass = _
    }
    return legend
  }

  legend.orient = function(_) {
    if (!arguments.length) return orient
    _ = _.toLowerCase()
    if (_ == "horizontal" || _ == "vertical") {
      orient = _
    }
    return legend
  }

  legend.ascending = function(_) {
    if (!arguments.length) return ascending
    ascending = !!_
    return legend
  }

  legend.classPrefix = function(_) {
    if (!arguments.length) return classPrefix
    classPrefix = _
    return legend
  }

  legend.title = function(_) {
    if (!arguments.length) return title
    title = _
    return legend
  }

  legend.titleWidth = function(_) {
    if (!arguments.length) return titleWidth
    titleWidth = _
    return legend
  }

  legend.textWrap = function(_) {
    if (!arguments.length) return textWrap
    textWrap = _
    return legend
  }

  legend.on = function() {
    const value = legendDispatcher.on.apply(legendDispatcher, arguments)
    return value === legendDispatcher ? legend : value
  }

  return legend
}
