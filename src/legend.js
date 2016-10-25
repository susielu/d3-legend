export default {

  d3_identity: function (d) {
    return d;
  },

  d3_mergeLabels: function (gen=[], labels, domain, range) {

      if (typeof labels === "object"){
        if(labels.length === 0) return gen;

        let i = labels.length;
        for (; i < gen.length; i++) {
          labels.push(gen[i]);
        }
        return labels;
      } else if (typeof labels === "function") {
        const customLabels = []
        const genLength = gen.length
        for (let i=0; i < genLength; i++){
          customLabels.push(labels({
            i, 
            genLength,
            generatedLabels : gen,
            domain,
            range }))
        }
        return customLabels
      }

      return gen;
    },

  d3_linearLegend: function (scale, cells, labelFormat) {
    var data = [];

    if (cells.length > 1){
      data = cells;

    } else {
      var domain = scale.domain(),
      increment = (domain[domain.length - 1] - domain[0])/(cells - 1),
      i = 0;

      for (; i < cells; i++){
        data.push(domain[0] + i*increment);
      }
    }

    var labels = data.map(labelFormat);

    return {data: data,
            labels: labels,
            feature: function(d){ return scale(d); }};
  },

  d3_quantLegend: function (scale, labelFormat, labelDelimiter) {
    var labels = scale.range().map(function(d){
      var invert = scale.invertExtent(d);

      return labelFormat(invert[0]) + " " + labelDelimiter + " " + labelFormat(invert[1]);

    });

    return {data: scale.range(),
            labels: labels,
            feature: this.d3_identity
          };
  },

  d3_ordinalLegend: function (scale) {
    return {data: scale.domain(),
            labels: scale.domain(),
            feature: function(d){ return scale(d); }};
  },

  d3_drawShapes: function (shape, shapes, shapeHeight, shapeWidth, shapeRadius, path) {
    if (shape === "rect"){
        shapes.attr("height", shapeHeight).attr("width", shapeWidth);

    } else if (shape === "circle") {
        shapes.attr("r", shapeRadius)//.attr("cx", shapeRadius).attr("cy", shapeRadius);

    } else if (shape === "line") {
        shapes.attr("x1", 0).attr("x2", shapeWidth).attr("y1", 0).attr("y2", 0);

    } else if (shape === "path") {
      shapes.attr("d", path);
    }
  },

  d3_addText: function (svg, enter, labels, classPrefix){
    enter.append("text").attr("class", classPrefix + "label");
    svg.selectAll("g." + classPrefix + "cell text").data(labels).text(this.d3_identity);
  },

  d3_calcType: function (scale, ascending, cells, labels, labelFormat, labelDelimiter){
    var type = scale.invertExtent ?
            this.d3_quantLegend(scale, labelFormat, labelDelimiter) : scale.ticks ?
            this.d3_linearLegend(scale, cells, labelFormat) : this.d3_ordinalLegend(scale);

    type.labels = this.d3_mergeLabels(type.labels, labels, scale.domain(), scale.range());

    if (ascending) {
      type.labels = this.d3_reverse(type.labels);
      type.data = this.d3_reverse(type.data);
    }

    return type;
  },

  d3_reverse: function(arr) {
    var mirror = [];
    for (var i = 0, l = arr.length; i < l; i++) {
      mirror[i] = arr[l-i-1];
    }
    return mirror;
  },

  d3_placement: function (orient, cell, cellTrans, text, textTrans, labelAlign) {
    cell.attr("transform", cellTrans);
    text.attr("transform", textTrans);
    if (orient === "horizontal"){
      text.style("text-anchor", labelAlign);
    }
  },

  d3_addEvents: function(cells, dispatcher){
    var _ = this;

      cells.on("mouseover.legend", function (d) { _.d3_cellOver(dispatcher, d, this); })
          .on("mouseout.legend", function (d) { _.d3_cellOut(dispatcher, d, this); })
          .on("click.legend", function (d) { _.d3_cellClick(dispatcher, d, this); });
  },

  d3_cellOver: function(cellDispatcher, d, obj){
    cellDispatcher.call("cellover", obj, d);
  },

  d3_cellOut: function(cellDispatcher, d, obj){
    cellDispatcher.call("cellout", obj, d);
  },

  d3_cellClick: function(cellDispatcher, d, obj){
    cellDispatcher.call("cellclick", obj, d);
  },

  d3_title: function(svg, title, classPrefix){
    if (title !== ""){

      var titleText = svg.selectAll('text.' + classPrefix + 'legendTitle');

      titleText.data([title])
        .enter()
        .append('text')
        .attr('class', classPrefix + 'legendTitle');

        svg.selectAll('text.' + classPrefix + 'legendTitle')
            .text(title)

      var cellsSvg = svg.select('.' + classPrefix + 'legendCells')

      var yOffset = svg.select('.' + classPrefix + 'legendTitle').nodes()
          .map(function(d) { return d.getBBox().height})[0],
      xOffset = -cellsSvg.nodes().map(function(d) { return d.getBBox().x})[0];

      cellsSvg.attr('transform', 'translate(' + xOffset + ',' + (yOffset + 10) + ')');

    }
  }
}
