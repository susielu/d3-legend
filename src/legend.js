const d3_identity =  (d) => d

const d3_reverse = (arr) => {
  const mirror = [];
  for (let i = 0, l = arr.length; i < l; i++) {
    mirror[i] = arr[l-i-1];
  }
  return mirror;
}

const d3_mergeLabels = (gen=[], labels, domain, range) => {

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
  }

const d3_linearLegend = (scale, cells, labelFormat) => {
  let data = [];

  if (cells.length > 1){
    data = cells;

  } else {
    const domain = scale.domain(),
    increment = (domain[domain.length - 1] - domain[0])/(cells - 1)
    let i = 0;

    for (; i < cells; i++){
      data.push(domain[0] + i*increment);
    }
  }

  const labels = data.map(labelFormat);

  return {data: data,
          labels: labels,
          feature: d => scale(d)};
}

const d3_quantLegend = (scale, labelFormat, labelDelimiter) => {
  const labels = scale.range().map( d => {
    const invert = scale.invertExtent(d);
    return labelFormat(invert[0]) + " " + labelDelimiter + " " + labelFormat(invert[1]);
  });

  return {data: scale.range(),
          labels: labels,
          feature: d3_identity
        };
}

const d3_ordinalLegend= scale => ({data: scale.domain(),
          labels: scale.domain(),
          feature: d => scale(d) 
        }
)

const d3_cellOver = (cellDispatcher, d, obj) => {
  cellDispatcher.call("cellover", obj, d);
}

const d3_cellOut = (cellDispatcher, d, obj) => {
  cellDispatcher.call("cellout", obj, d);
}

const d3_cellClick = (cellDispatcher, d, obj) => {
  cellDispatcher.call("cellclick", obj, d);
}


export default {

  d3_drawShapes: (shape, shapes, shapeHeight, shapeWidth, shapeRadius, path) => {
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
    svg.selectAll(`g.${classPrefix}cell text.${classPrefix}label`).data(labels).text(d3_identity);
  },

  d3_labelsFilter: function(filter, labels, data){

    const join = labels.map((d,i) => ({label: d, data: data[i]})) 
    const filteredValues = filter(join) || []

    labels = filteredValues.map(d => d.label)
    data = filteredValues.map(d => d.data)

    return { labels, data }
  },

  d3_calcType: function (scale, ascending, cells, labels, labelFormat, labelDelimiter){
    const type = scale.invertExtent ?
            d3_quantLegend(scale, labelFormat, labelDelimiter) : scale.ticks ?
            d3_linearLegend(scale, cells, labelFormat) : d3_ordinalLegend(scale);

    type.labels = d3_mergeLabels(type.labels, labels, scale.domain(), scale.range());

    if (ascending) {
      type.labels = d3_reverse(type.labels);
      type.data = d3_reverse(type.data);
    }

    if (filter && typeof filter === "function"){
      const filtered = d3_labelsFilter(filter, type.labels, type.data)
      type.labels = filtered.labels
      type.data = filtered.data
    }

    return type;
  },

  d3_placement: (orient, cell, cellTrans, text, textTrans, labelAlign) => {
    cell.attr("transform", cellTrans);
    text.attr("transform", textTrans);
    if (orient === "horizontal"){
      text.style("text-anchor", labelAlign);
    }
  },

  d3_addEvents: function(cells, dispatcher){
      cells.on("mouseover.legend", function (d) { d3_cellOver(dispatcher, d, this); })
          .on("mouseout.legend", function (d) { d3_cellOut(dispatcher, d, this); })
          .on("click.legend", function (d) { d3_cellClick(dispatcher, d, this); });
  },

  d3_title: (svg, title, classPrefix) => {
    if (title !== ""){

      const titleText = svg.selectAll('text.' + classPrefix + 'legendTitle');

      titleText.data([title])
        .enter()
        .append('text')
        .attr('class', classPrefix + 'legendTitle');

        svg.selectAll('text.' + classPrefix + 'legendTitle')
            .text(title)

      const cellsSvg = svg.select('.' + classPrefix + 'legendCells')

      const yOffset = svg.select('.' + classPrefix + 'legendTitle').nodes()
          .map(d => d.getBBox().height)[0],
      xOffset = -cellsSvg.nodes().map(function(d) { return d.getBBox().x})[0];

      cellsSvg.attr('transform', 'translate(' + xOffset + ',' + (yOffset + 10) + ')');

    }
  }
}
