import { select } from 'd3-selection';
import { dispatch } from 'd3-dispatch';
import { scaleLinear } from 'd3-scale';
import { format } from 'd3-format';
import { sum, max } from 'd3-array';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var asyncGenerator = function () {
    function AwaitValue(value) {
      this.value = value;
    }

    function AsyncGenerator(gen) {
      var front, back;

      function send(key, arg) {
        return new Promise(function (resolve, reject) {
          var request = {
            key: key,
            arg: arg,
            resolve: resolve,
            reject: reject,
            next: null
          };

          if (back) {
            back = back.next = request;
          } else {
            front = back = request;
            resume(key, arg);
          }
        });
      }

      function resume(key, arg) {
        try {
          var result = gen[key](arg);
          var value = result.value;

          if (value instanceof AwaitValue) {
            Promise.resolve(value.value).then(function (arg) {
              resume("next", arg);
            }, function (arg) {
              resume("throw", arg);
            });
          } else {
            settle(result.done ? "return" : "normal", result.value);
          }
        } catch (err) {
          settle("throw", err);
        }
      }

      function settle(type, value) {
        switch (type) {
          case "return":
            front.resolve({
              value: value,
              done: true
            });
            break;

          case "throw":
            front.reject(value);
            break;

          default:
            front.resolve({
              value: value,
              done: false
            });
            break;
        }

        front = front.next;

        if (front) {
          resume(front.key, front.arg);
        } else {
          back = null;
        }
      }

      this._invoke = send;

      if (typeof gen.return !== "function") {
        this.return = undefined;
      }
    }

    if (typeof Symbol === "function" && Symbol.asyncIterator) {
      AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
        return this;
      };
    }

    AsyncGenerator.prototype.next = function (arg) {
      return this._invoke("next", arg);
    };

    AsyncGenerator.prototype.throw = function (arg) {
      return this._invoke("throw", arg);
    };

    AsyncGenerator.prototype.return = function (arg) {
      return this._invoke("return", arg);
    };

    return {
      wrap: function (fn) {
        return function () {
          return new AsyncGenerator(fn.apply(this, arguments));
        };
      },
      await: function (value) {
        return new AwaitValue(value);
      }
    };
  }();

var d3_identity = function d3_identity(d) {
    return d;
  };

  var d3_reverse = function d3_reverse(arr) {
    var mirror = [];
    for (var i = 0, l = arr.length; i < l; i++) {
      mirror[i] = arr[l - i - 1];
    }
    return mirror;
  };

  //Text wrapping code adapted from Mike Bostock
  var d3_textWrapping = function d3_textWrapping(text, width) {
    text.each(function () {
      var text = d3Selection.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.2,
          //ems
      y = text.attr("y"),
          dy = parseFloat(text.attr("dy")) || 0,
          tspan = text.text(null).append("tspan").attr("x", 0).attr("dy", dy + "em");

      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width && line.length > 1) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("dy", lineHeight + dy + "em").text(word);
        }
      }
    });
  };

  var d3_mergeLabels = function d3_mergeLabels() {
    var gen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var labels = arguments[1];
    var domain = arguments[2];
    var range = arguments[3];


    if ((typeof labels === "undefined" ? "undefined" : _typeof(labels)) === "object") {
      if (labels.length === 0) return gen;

      var i = labels.length;
      for (; i < gen.length; i++) {
        labels.push(gen[i]);
      }
      return labels;
    } else if (typeof labels === "function") {
      var customLabels = [];
      var genLength = gen.length;
      for (var _i = 0; _i < genLength; _i++) {
        customLabels.push(labels({
          i: _i,
          genLength: genLength,
          generatedLabels: gen,
          domain: domain,
          range: range }));
      }
      return customLabels;
    }

    return gen;
  };

  var d3_linearLegend = function d3_linearLegend(scale, cells, labelFormat) {
    var data = [];

    if (cells.length > 1) {
      data = cells;
    } else {
      var domain = scale.domain(),
          increment = (domain[domain.length - 1] - domain[0]) / (cells - 1);
      var i = 0;

      for (; i < cells; i++) {
        data.push(domain[0] + i * increment);
      }
    }

    var labels = data.map(labelFormat);

    return { data: data,
      labels: labels,
      feature: function feature(d) {
        return scale(d);
      } };
  };

  var d3_quantLegend = function d3_quantLegend(scale, labelFormat, labelDelimiter) {
    var labels = scale.range().map(function (d) {
      var invert = scale.invertExtent(d);
      return labelFormat(invert[0]) + " " + labelDelimiter + " " + labelFormat(invert[1]);
    });

    return { data: scale.range(),
      labels: labels,
      feature: d3_identity
    };
  };

  var d3_ordinalLegend = function d3_ordinalLegend(scale) {
    return { data: scale.domain(),
      labels: scale.domain(),
      feature: function feature(d) {
        return scale(d);
      } };
  };

  var d3_cellOver = function d3_cellOver(cellDispatcher, d, obj) {
    cellDispatcher.call("cellover", obj, d);
  };

  var d3_cellOut = function d3_cellOut(cellDispatcher, d, obj) {
    cellDispatcher.call("cellout", obj, d);
  };

  var d3_cellClick = function d3_cellClick(cellDispatcher, d, obj) {
    cellDispatcher.call("cellclick", obj, d);
  };

var helper = {

    d3_drawShapes: function d3_drawShapes(shape, shapes, shapeHeight, shapeWidth, shapeRadius, path) {
      if (shape === "rect") {
        shapes.attr("height", shapeHeight).attr("width", shapeWidth);
      } else if (shape === "circle") {
        shapes.attr("r", shapeRadius); //.attr("cx", shapeRadius).attr("cy", shapeRadius);
      } else if (shape === "line") {
        shapes.attr("x1", 0).attr("x2", shapeWidth).attr("y1", 0).attr("y2", 0);
      } else if (shape === "path") {
        shapes.attr("d", path);
      }
    },

    d3_addText: function d3_addText(svg, enter, labels, classPrefix, labelWidth) {
      enter.append("text").attr("class", classPrefix + "label");
      svg.selectAll("g." + classPrefix + "cell text." + classPrefix + "label").data(labels).text(d3_identity);

      // if (labelWidth){
      //   svg.selectAll(`g.${classPrefix}cell text.${classPrefix}label`)
      //       .call(d3_textWrapping, labelWidth)
      // }
    },

    d3_calcType: function d3_calcType(scale, ascending, cells, labels, labelFormat, labelDelimiter) {
      var type = scale.invertExtent ? d3_quantLegend(scale, labelFormat, labelDelimiter) : scale.ticks ? d3_linearLegend(scale, cells, labelFormat) : d3_ordinalLegend(scale);

      type.labels = d3_mergeLabels(type.labels, labels, scale.domain(), scale.range());

      if (ascending) {
        type.labels = d3_reverse(type.labels);
        type.data = d3_reverse(type.data);
      }

      return type;
    },

    d3_filterCells: function d3_filterCells(type, cellFilter) {
      var filterCells = type.data.map(function (d, i) {
        return { data: d, label: type.labels[i] };
      }).filter(cellFilter);
      var dataValues = filterCells.map(function (d) {
        return d.data;
      });
      var labelValues = filterCells.map(function (d) {
        return d.label;
      });
      type.data = type.data.filter(function (d) {
        return dataValues.indexOf(d) !== -1;
      });
      type.labels = type.labels.filter(function (d) {
        return labelValues.indexOf(d) !== -1;
      });
      return type;
    },

    d3_placement: function d3_placement(orient, cell, cellTrans, text, textTrans, labelAlign) {
      cell.attr("transform", cellTrans);
      text.attr("transform", textTrans);
      if (orient === "horizontal") {
        text.style("text-anchor", labelAlign);
      }
    },

    d3_addEvents: function d3_addEvents(cells, dispatcher) {
      cells.on("mouseover.legend", function (d) {
        d3_cellOver(dispatcher, d, this);
      }).on("mouseout.legend", function (d) {
        d3_cellOut(dispatcher, d, this);
      }).on("click.legend", function (d) {
        d3_cellClick(dispatcher, d, this);
      });
    },

    d3_title: function d3_title(svg, title, classPrefix, titleWidth) {
      if (title !== "") {

        var titleText = svg.selectAll('text.' + classPrefix + 'legendTitle');

        titleText.data([title]).enter().append('text').attr('class', classPrefix + 'legendTitle');

        svg.selectAll('text.' + classPrefix + 'legendTitle').text(title);

        if (titleWidth) {
          svg.selectAll('text.' + classPrefix + 'legendTitle').call(d3_textWrapping, titleWidth);
        }

        var cellsSvg = svg.select('.' + classPrefix + 'legendCells');
        var yOffset = svg.select('.' + classPrefix + 'legendTitle').nodes().map(function (d) {
          return d.getBBox().height;
        })[0],
            xOffset = -cellsSvg.nodes().map(function (d) {
          return d.getBBox().x;
        })[0];
        cellsSvg.attr('transform', 'translate(' + xOffset + ',' + yOffset + ')');
      }
    }
  };

function color() {

    var scale = d3Scale.scaleLinear(),
        shape = "rect",
        shapeWidth = 15,
        shapeHeight = 15,
        shapeRadius = 10,
        shapePadding = 2,
        cells = [5],
        cellFilter = void 0,
        labels = [],
        classPrefix = "",
        useClass = false,
        title = "",
        labelFormat = d3Format.format(".01f"),
        labelOffset = 10,
        labelAlign = "middle",
        labelDelimiter = "to",
        labelWidth = void 0,
        orient = "vertical",
        ascending = false,
        path = void 0,
        titleWidth = void 0,
        legendDispatcher = d3Dispatch.dispatch("cellover", "cellout", "cellclick");

    function legend(svg) {

      var type = helper.d3_calcType(scale, ascending, cells, labels, labelFormat, labelDelimiter),
          legendG = svg.selectAll('g').data([scale]);

      legendG.enter().append('g').attr('class', classPrefix + 'legendCells');

      if (cellFilter) {
        helper.d3_filterCells(type, cellFilter);
      }

      var cell = svg.select('.' + classPrefix + 'legendCells').selectAll("." + classPrefix + "cell").data(type.data);

      var cellEnter = cell.enter().append("g").attr("class", classPrefix + "cell");
      cellEnter.append(shape).attr("class", classPrefix + "swatch");

      var shapes = svg.selectAll("g." + classPrefix + "cell " + shape);

      //add event handlers
      helper.d3_addEvents(cellEnter, legendDispatcher);

      cell.exit().transition().style("opacity", 0).remove();

      helper.d3_drawShapes(shape, shapes, shapeHeight, shapeWidth, shapeRadius, path);
      helper.d3_addText(svg, cellEnter, type.labels, classPrefix);

      // we need to merge the selection, otherwise changes in the legend (e.g. change of orientation) are applied only to the new cells and not the existing ones.
      cell = cellEnter.merge(cell);

      // sets placement
      var text = cell.selectAll("text"),
          shapeSize = shapes.nodes().map(function (d) {
        return d.getBBox();
      });
      //sets scale
      //everything is fill except for line which is stroke,
      if (!useClass) {
        if (shape == "line") {
          shapes.style("stroke", type.feature);
        } else {
          shapes.style("fill", type.feature);
        }
      } else {
        shapes.attr("class", function (d) {
          return classPrefix + 'swatch ' + type.feature(d);
        });
      }

      var cellTrans = void 0,
          textTrans = void 0,
          textAlign = labelAlign == "start" ? 0 : labelAlign == "middle" ? 0.5 : 1;

      //positions cells and text
      if (orient === "vertical") {
        cellTrans = function cellTrans(d, i) {
          return 'translate(0, ' + i * (shapeSize[i].height + shapePadding) + ')';
        };
        textTrans = function textTrans(d, i) {
          return 'translate( ' + (shapeSize[i].width + shapeSize[i].x + labelOffset) + ', ' + (shapeSize[i].y + shapeSize[i].height / 2 + 5) + ')';
        };
      } else if (orient === "horizontal") {
        cellTrans = function cellTrans(d, i) {
          return 'translate(' + i * (shapeSize[i].width + shapePadding) + ',0)';
        };
        textTrans = function textTrans(d, i) {
          return 'translate(' + (shapeSize[i].width * textAlign + shapeSize[i].x) + ',\n          ' + (shapeSize[i].height + shapeSize[i].y + labelOffset + 8) + ')';
        };
      }

      helper.d3_placement(orient, cell, cellTrans, text, textTrans, labelAlign);
      helper.d3_title(svg, title, classPrefix, titleWidth);

      cell.transition().style("opacity", 1);
    }

    legend.scale = function (_) {
      if (!arguments.length) return scale;
      scale = _;
      return legend;
    };

    legend.cells = function (_) {
      if (!arguments.length) return cells;
      if (_.length > 1 || _ >= 2) {
        cells = _;
      }
      return legend;
    };

    legend.cellFilter = function (_) {
      if (!arguments.length) return cellFilter;
      cellFilter = _;
      return legend;
    };

    legend.shape = function (_, d) {
      if (!arguments.length) return shape;
      if (_ == "rect" || _ == "circle" || _ == "line" || _ == "path" && typeof d === 'string') {
        shape = _;
        path = d;
      }
      return legend;
    };

    legend.shapeWidth = function (_) {
      if (!arguments.length) return shapeWidth;
      shapeWidth = +_;
      return legend;
    };

    legend.shapeHeight = function (_) {
      if (!arguments.length) return shapeHeight;
      shapeHeight = +_;
      return legend;
    };

    legend.shapeRadius = function (_) {
      if (!arguments.length) return shapeRadius;
      shapeRadius = +_;
      return legend;
    };

    legend.shapePadding = function (_) {
      if (!arguments.length) return shapePadding;
      shapePadding = +_;
      return legend;
    };

    legend.labels = function (_) {
      if (!arguments.length) return labels;
      labels = _;
      return legend;
    };

    legend.labelAlign = function (_) {
      if (!arguments.length) return labelAlign;
      if (_ == "start" || _ == "end" || _ == "middle") {
        labelAlign = _;
      }
      return legend;
    };

    legend.labelFormat = function (_) {
      if (!arguments.length) return labelFormat;
      labelFormat = typeof _ === 'string' ? d3Format.format(_) : _;      return legend;
    };

    legend.labelOffset = function (_) {
      if (!arguments.length) return labelOffset;
      labelOffset = +_;
      return legend;
    };

    legend.labelDelimiter = function (_) {
      if (!arguments.length) return labelDelimiter;
      labelDelimiter = _;
      return legend;
    };

    legend.labelWidth = function (_) {
      if (!arguments.length) return labelWidth;
      labelWidth = _;
      return legend;
    };

    legend.useClass = function (_) {
      if (!arguments.length) return useClass;
      if (_ === true || _ === false) {
        useClass = _;
      }
      return legend;
    };

    legend.orient = function (_) {
      if (!arguments.length) return orient;
      _ = _.toLowerCase();
      if (_ == "horizontal" || _ == "vertical") {
        orient = _;
      }
      return legend;
    };

    legend.ascending = function (_) {
      if (!arguments.length) return ascending;
      ascending = !!_;
      return legend;
    };

    legend.classPrefix = function (_) {
      if (!arguments.length) return classPrefix;
      classPrefix = _;
      return legend;
    };

    legend.title = function (_) {
      if (!arguments.length) return title;
      title = _;
      return legend;
    };

    legend.titleWidth = function (_) {
      if (!arguments.length) return titleWidth;
      titleWidth = _;
      return legend;
    };

    legend.on = function () {
      var value = legendDispatcher.on.apply(legendDispatcher, arguments);
      return value === legendDispatcher ? legend : value;
    };

    return legend;
  };

function size() {

    var scale = d3Scale.scaleLinear(),
        shape = "rect",
        shapeWidth = 15,
        shapePadding = 2,
        cells = [5],
        cellFilter = void 0,
        labels = [],
        classPrefix = "",
        title = "",
        labelFormat = d3Format.format(".01f"),
        labelOffset = 10,
        labelAlign = "middle",
        labelDelimiter = "to",
        labelWidth = void 0,
        orient = "vertical",
        ascending = false,
        path = void 0,
        titleWidth = void 0,
        legendDispatcher = d3Dispatch.dispatch("cellover", "cellout", "cellclick");

    function legend(svg) {

      var type = helper.d3_calcType(scale, ascending, cells, labels, labelFormat, labelDelimiter),
          legendG = svg.selectAll('g').data([scale]);

      if (cellFilter) {
        helper.d3_filterCells(type, cellFilter);
      }

      legendG.enter().append('g').attr('class', classPrefix + 'legendCells');

      var cell = svg.select('.' + classPrefix + 'legendCells').selectAll("." + classPrefix + "cell").data(type.data);
      var cellEnter = cell.enter().append("g").attr("class", classPrefix + "cell");
      cellEnter.append(shape).attr("class", classPrefix + "swatch");

      var shapes = svg.selectAll("g." + classPrefix + "cell " + shape);

      //add event handlers
      helper.d3_addEvents(cellEnter, legendDispatcher);

      cell.exit().transition().style("opacity", 0).remove();

      //creates shape
      if (shape === "line") {
        helper.d3_drawShapes(shape, shapes, 0, shapeWidth);
        shapes.attr("stroke-width", type.feature);
      } else {
        helper.d3_drawShapes(shape, shapes, type.feature, type.feature, type.feature, path);
      }

      helper.d3_addText(svg, cellEnter, type.labels, classPrefix);

      // we need to merge the selection, otherwise changes in the legend (e.g. change of orientation) are applied only to the new cells and not the existing ones.
      cell = cellEnter.merge(cell);

      //sets placement
      var text = cell.selectAll("text"),
          shapeSize = shapes.nodes().map(function (d, i) {
        var bbox = d.getBBox();
        var stroke = scale(type.data[i]);

        if (shape === "line" && orient === "horizontal") {
          bbox.height = bbox.height + stroke;
        } else if (shape === "line" && orient === "vertical") {
          bbox.width = bbox.width;
        }

        return bbox;
      });

      var maxH = d3Array.max(shapeSize, function (d) {
        return d.height + d.y;
      }),
          maxW = d3Array.max(shapeSize, function (d) {
        return d.width + d.x;
      });

      var cellTrans = void 0,
          textTrans = void 0,
          textAlign = labelAlign == "start" ? 0 : labelAlign == "middle" ? 0.5 : 1;

      //positions cells and text
      if (orient === "vertical") {

        cellTrans = function cellTrans(d, i) {
          var height = d3Array.sum(shapeSize.slice(0, i + 1), function (d) {
            return d.height;
          });
          return 'translate(0, ' + (height + i * shapePadding) + ')';
        };

        textTrans = function textTrans(d, i) {
          return 'translate( ' + (maxW + labelOffset) + ',\n          ' + (shapeSize[i].y + shapeSize[i].height / 2 + 5) + ')';
        };
      } else if (orient === "horizontal") {
        cellTrans = function cellTrans(d, i) {
          var width = d3Array.sum(shapeSize.slice(0, i + 1), function (d) {
            return d.width;
          });
          return 'translate(' + (width + i * shapePadding) + ',0)';
        };

        textTrans = function textTrans(d, i) {
          return 'translate( ' + (shapeSize[i].width * textAlign + shapeSize[i].x) + ',\n              ' + (maxH + labelOffset) + ')';
        };
      }

      helper.d3_placement(orient, cell, cellTrans, text, textTrans, labelAlign);
      helper.d3_title(svg, title, classPrefix, titleWidth);

      cell.transition().style("opacity", 1);
    }

    legend.scale = function (_) {
      if (!arguments.length) return scale;
      scale = _;
      return legend;
    };

    legend.cells = function (_) {
      if (!arguments.length) return cells;
      if (_.length > 1 || _ >= 2) {
        cells = _;
      }
      return legend;
    };

    legend.cellFilter = function (_) {
      if (!arguments.length) return cellFilter;
      cellFilter = _;
      return legend;
    };

    legend.shape = function (_, d) {
      if (!arguments.length) return shape;
      if (_ == "rect" || _ == "circle" || _ == "line") {
        shape = _;
        path = d;
      }
      return legend;
    };

    legend.shapeWidth = function (_) {
      if (!arguments.length) return shapeWidth;
      shapeWidth = +_;
      return legend;
    };

    legend.shapePadding = function (_) {
      if (!arguments.length) return shapePadding;
      shapePadding = +_;
      return legend;
    };

    legend.labels = function (_) {
      if (!arguments.length) return labels;
      labels = _;
      return legend;
    };

    legend.labelAlign = function (_) {
      if (!arguments.length) return labelAlign;
      if (_ == "start" || _ == "end" || _ == "middle") {
        labelAlign = _;
      }
      return legend;
    };

    legend.labelFormat = function (_) {
      if (!arguments.length) return labelFormat;
      labelFormat = typeof _ === 'string' ? d3Format.format(_) : _;      return legend;
    };

    legend.labelOffset = function (_) {
      if (!arguments.length) return labelOffset;
      labelOffset = +_;
      return legend;
    };

    legend.labelDelimiter = function (_) {
      if (!arguments.length) return labelDelimiter;
      labelDelimiter = _;
      return legend;
    };

    legend.labelWidth = function (_) {
      if (!arguments.length) return labelWidth;
      labelWidth = _;
      return legend;
    };

    legend.orient = function (_) {
      if (!arguments.length) return orient;
      _ = _.toLowerCase();
      if (_ == "horizontal" || _ == "vertical") {
        orient = _;
      }
      return legend;
    };

    legend.ascending = function (_) {
      if (!arguments.length) return ascending;
      ascending = !!_;
      return legend;
    };

    legend.classPrefix = function (_) {
      if (!arguments.length) return classPrefix;
      classPrefix = _;
      return legend;
    };

    legend.title = function (_) {
      if (!arguments.length) return title;
      title = _;
      return legend;
    };

    legend.titleWidth = function (_) {
      if (!arguments.length) return titleWidth;
      titleWidth = _;
      return legend;
    };

    legend.on = function () {
      var value = legendDispatcher.on.apply(legendDispatcher, arguments);
      return value === legendDispatcher ? legend : value;
    };

    return legend;
  };

function symbol() {

    var scale = d3Scale.scaleLinear(),
        shape = "path",
        shapeWidth = 15,
        shapeHeight = 15,
        shapeRadius = 10,
        shapePadding = 5,
        cells = [5],
        cellFilter = void 0,
        labels = [],
        classPrefix = "",
        title = "",
        labelFormat = d3Format.format(".01f"),
        labelAlign = "middle",
        labelOffset = 10,
        labelDelimiter = "to",
        labelWidth = void 0,
        orient = "vertical",
        ascending = false,
        titleWidth = void 0,
        legendDispatcher = d3Dispatch.dispatch("cellover", "cellout", "cellclick");

    function legend(svg) {

      var type = helper.d3_calcType(scale, ascending, cells, labels, labelFormat, labelDelimiter),
          legendG = svg.selectAll('g').data([scale]);

      if (cellFilter) {
        helper.d3_filterCells(type, cellFilter);
      }

      legendG.enter().append('g').attr('class', classPrefix + 'legendCells');

      var cell = svg.select('.' + classPrefix + 'legendCells').selectAll("." + classPrefix + "cell").data(type.data);
      var cellEnter = cell.enter().append("g").attr("class", classPrefix + "cell");
      cellEnter.append(shape).attr("class", classPrefix + "swatch");

      var shapes = svg.selectAll("g." + classPrefix + "cell " + shape);

      //add event handlers
      helper.d3_addEvents(cellEnter, legendDispatcher);

      //remove old shapes
      cell.exit().transition().style("opacity", 0).remove();

      helper.d3_drawShapes(shape, shapes, shapeHeight, shapeWidth, shapeRadius, type.feature);
      helper.d3_addText(svg, cellEnter, type.labels, classPrefix, labelWidth);

      // we need to merge the selection, otherwise changes in the legend (e.g. change of orientation) are applied only to the new cells and not the existing ones.
      cell = cellEnter.merge(cell);

      // sets placement
      var text = cell.selectAll("text"),
          shapeSize = shapes.nodes().map(function (d) {
        return d.getBBox();
      });

      var maxH = d3Array.max(shapeSize, function (d) {
        return d.height;
      }),
          maxW = d3Array.max(shapeSize, function (d) {
        return d.width;
      });

      var cellTrans = void 0,
          textTrans = void 0,
          textAlign = labelAlign == "start" ? 0 : labelAlign == "middle" ? 0.5 : 1;

      //positions cells and text
      if (orient === "vertical") {
        cellTrans = function cellTrans(d, i) {
          return 'translate(0, ' + i * (maxH + shapePadding) + ' )';
        };
        textTrans = function textTrans(d, i) {
          return 'translate( ' + (maxW + labelOffset) + ',\n              ' + (shapeSize[i].y + shapeSize[i].height / 2 + 5) + ')';
        };
      } else if (orient === "horizontal") {
        cellTrans = function cellTrans(d, i) {
          return 'translate( ' + i * (maxW + shapePadding) + ',0)';
        };
        textTrans = function textTrans(d, i) {
          return 'translate( ' + (shapeSize[i].width * textAlign + shapeSize[i].x) + ',\n              ' + (maxH + labelOffset) + ')';
        };
      }

      helper.d3_placement(orient, cell, cellTrans, text, textTrans, labelAlign);
      helper.d3_title(svg, title, classPrefix, titleWidth);
      cell.transition().style("opacity", 1);
    }

    legend.scale = function (_) {
      if (!arguments.length) return scale;
      scale = _;
      return legend;
    };

    legend.cells = function (_) {
      if (!arguments.length) return cells;
      if (_.length > 1 || _ >= 2) {
        cells = _;
      }
      return legend;
    };

    legend.cellFilter = function (_) {
      if (!arguments.length) return cellFilter;
      cellFilter = _;
      return legend;
    };

    legend.shapePadding = function (_) {
      if (!arguments.length) return shapePadding;
      shapePadding = +_;
      return legend;
    };

    legend.labels = function (_) {
      if (!arguments.length) return labels;
      labels = _;
      return legend;
    };

    legend.labelAlign = function (_) {
      if (!arguments.length) return labelAlign;
      if (_ == "start" || _ == "end" || _ == "middle") {
        labelAlign = _;
      }
      return legend;
    };

    legend.labelFormat = function (_) {
      if (!arguments.length) return labelFormat;
      labelFormat = typeof _ === 'string' ? d3Format.format(_) : _;      return legend;
    };

    legend.labelOffset = function (_) {
      if (!arguments.length) return labelOffset;
      labelOffset = +_;
      return legend;
    };

    legend.labelDelimiter = function (_) {
      if (!arguments.length) return labelDelimiter;
      labelDelimiter = _;
      return legend;
    };

    legend.labelWidth = function (_) {
      if (!arguments.length) return labelWidth;
      labelWidth = _;
      return legend;
    };

    legend.orient = function (_) {
      if (!arguments.length) return orient;
      _ = _.toLowerCase();
      if (_ == "horizontal" || _ == "vertical") {
        orient = _;
      }
      return legend;
    };

    legend.ascending = function (_) {
      if (!arguments.length) return ascending;
      ascending = !!_;
      return legend;
    };

    legend.classPrefix = function (_) {
      if (!arguments.length) return classPrefix;
      classPrefix = _;
      return legend;
    };

    legend.title = function (_) {
      if (!arguments.length) return title;
      title = _;
      return legend;
    };

    legend.titleWidth = function (_) {
      if (!arguments.length) return titleWidth;
      titleWidth = _;
      return legend;
    };

    legend.on = function () {
      var value = legendDispatcher.on.apply(legendDispatcher, arguments);
      return value === legendDispatcher ? legend : value;
    };

    return legend;
  };

var thresholdLabels = function thresholdLabels(_ref) {
    var i = _ref.i,
        genLength = _ref.genLength,
        generatedLabels = _ref.generatedLabels;


    if (i === 0) {
      return generatedLabels[i].replace('NaN to', 'Less than');
    } else if (i === genLength - 1) {
      return 'More than ' + generatedLabels[genLength - 1].replace(' to NaN', '');
    }
    return generatedLabels[i];
  };

var legendHelpers = {    thresholdLabels: thresholdLabels
  };

var index = {
    legendColor: color,
    legendSize: size,
    legendSymbol: symbol,    legendHelpers: legendHelpers
  };

export { color as legendColor, size as legendSize, symbol as legendSymbol, legendHelpers };export default index;
//# sourceMappingURL=indexRollup.mjs.map
