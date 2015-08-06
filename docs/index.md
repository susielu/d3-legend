## Contents
- [Color Legend](#color)
  - [Documentation](#color-doc)
  - [Examples](#color-examples)
    - [Quantile Scale Legend](#color-quant)
    - [Linear Scale Legend - Horizontal](#color-linear)
    - [Linear Scale Legend - 10 cells](#color-linear-10)
    - [Linear Scale Legend - Custom cells](#color-linear-custom)
    - [Ordinal Scale Legend - Custom shape](#color-ordinal)
- [Size Legend](#size)
  - [Documentation](#size-doc)
  - [Examples](#size-examples)
    - [Linear Scale Legend - Circles](#size-linear)
    - [Linear Scale Legend - Lines](#size-line)

- [Symbol Legend](#symbol)
  - [Documentation](#symbol-doc)
  - [Examples](#symbol-examples)
    - [Ordinal Scale Legend - Custom Symbols](#symbol-ordinal)


## Color
### Documentation
d3.legend.**color()**

Constructs a new color legend. The legend component expects a d3 scale as the basic input, but also has a number of optional parameters for changing the default display such as vertical or horizontal orientation, shape of the symbol next to the label, symbol sizing, and label formatting.

color.**scale(d3.scale)**

Creates a new d3 legend based on the scale. The code determines the type of scale and generates the appropriate symbol and label pairs.

color.**cells(number or [numbers])**

This parameter is only valid for continuous scales (like linear and log). When there is no indication from the domain or range for the number of steps in the legend you may want to display, it defaults to five steps in equal increments. You can pass the cells function a single number which will create equal increments for that number of steps, or an array of the [specific steps](#color-linear-custom) you want the legend to display.

color.**orient(string)**

Accepts "vertical" or "horizontal" for legend orientation. Default set to "vertical."

color.**shape(string[, path-string])**

Accepts "rect", "circle", "line", or "path". If you choose "path," you must also pass a second parameter as a path string. Defaults to "rect." An example: [Color - Ordinal Scale Legend, custom shape](#color-ordinal).

color.**shapeWidth(number)**

Only applies to shape of "rect" or "line." Default set to 15px.

color.**shapeHeight(number)**

Only applies to shape of "rect." Default set to 15px.

color.**shapeRadius(number)**

Only applies to shape of "circle." Default set to 10px.

color.**shapePadding(number)**

Applies to all shapes. Determines vertical or horizontal spacing between shapes depending on the respective orient setting. Default set to 2px.

color.**useClass(boolean)**

The default behavior is for the legend to set the fill of the legend's symbols (except for the "line" shape which uses stroke). If you set useClass to `true` then it will apply the scale's output as classes to the shapes instead of the fill or stroke. An example: [Color - Quantile Scale Legend](#color-quant).

color.**labels([string])**

Sets the legend labels to the array of strings passed to the legend. If the array is not the same length as the array the legend calculates, it merges the values and gives the calculated labels for the remaining items. An example: [Size - Linear Scale Legend, Lines](#size-line).

color.**labelAlign(string)**

Only used if the legend's orient is set to "horizontal." Accepts "start", "middle", or "end" as inputs to determine if the labels are aligned on the left, middle or right under the symbol in a horizontal legend. An example: [Size - Linear Scale Legend, Lines](#size-line).

color.**labelFormat(d3.format)**

Takes a [d3.format](https://github.com/mbostock/d3/wiki/Formatting) and applies that styling to the legend labels. Default is set to `d3.format(".01f")`.

color.**labelOffset(number)**

A value that determines how far the label is from the symbol in each legend item. Default set to 10px.

color.**labelDelimiter(string)**

Change the default "to" text when working with a quant scale.

color.**on(string, function)**

There are three custom event types you can bind to the legend: "cellover", "cellout", and "cellclick" An exampe: [Symbol - Ordinal Scale](#symbol-ordinal)

### Examples

## Size
### Documentation
d3.legend.**size()**

Constructs a new size legend. The legend component expects a d3 scale as the basic input, but also has a number of optional parameters for changing the default display such as vertical or horizontal orientation, shape of the symbol next to the label, symbol sizing, and label formatting.

size.**scale(d3.scale)**

Creates a new d3 legend based on the scale. The code determines the type of scale and generates the different symbol and label pairs. Expects a scale that has a numerical range.

size.**cells(number or [numbers])**

This parameter is only valid for continuous scales (like linear and log). When there is no indication from the domain or range for the number of steps in the legend you may want to display, it defaults to five steps in equal increments. You can pass the cells function a single number which will create equal increments for that number of steps, or an array of the [specific steps](#color-linear-custom) you want the legend to display.

size.**orient(string)**

Accepts "vertical" or "horizontal" for legend orientation. Default set to "vertical."

size.**shape(string)**

Accepts "rect", "circle", or "line". Defaults to "rect." The assumption is that the scale's output will be used for the width and height if you select "rect," the radius if you select "circle," and the stroke-width if you select "line." If you want to have a custom shape of different sizes in your legend, use the symbol legend and make each path string for the sizes you want as the range array.

size.**shapeWidth(number)**

Only applies to shape "line." Default set to 15px.

size.**shapePadding(number)**

Applies to all shapes. Determines vertical or horizontal spacing between shapes depending on the respective orient setting. Default set to 2px.

size.**labels([string])**

Sets the legend labels to the array of strings passed to the legend. If the array is not the same length as the array the legend calculates, it merges the values and gives the calculated labels for the remaining items. An example: [Size - Linear Scale Legend, Lines](#size-line)

size.**labelAlign(string)**

Only used if the legend's orient is set to "horizontal." Accepts "start", "middle", or "end" as inputs to determine if the labels are aligned on the left, middle or right under the symbol in a horizontal legend. An example: [Size - Linear Scale Legend, Lines](#size-line).

size.**labelFormat(d3.format)**

Takes a [d3.format](https://github.com/mbostock/d3/wiki/Formatting) and applies that styling to the legend labels. Default is set to `d3.format(".01f")`.

size.**labelOffset(number)**

A value that determines how far the label is from the symbol in each legend item. Default set to 10px.

size.**labelDelimiter(string)**

Change the default "to" text when working with a quant scale.

size.**on(string, function)**

There are three custom event types you can bind to the legend: "cellover", "cellout", and "cellclick" An exampe: [Symbol - Ordinal Scale](#symbol-ordinal)

### Examples

## Symbol
### Documentation
d3.legend.**symbol()**

Constructs a new symbol legend. The legend component expects a d3 scale as the basic input, but also has a number of optional parameters for changing the default display such as vertical or horizontal orientation, shape of the symbol next to the label, symbol sizing, and label formatting.

symbol.**scale()**

Creates a new d3 legend based on the scale. The code determines the type of scale and generates the different symbol and label pairs. The scale's range will be used as the d-attribute in an svg path for each symbol in the legend.

symbol.**cells()**

This parameter is only valid for continuous scales (like linear and log). When there is no indication from the domain or range for the number of steps in the legend you may want to display, it defaults to five steps in equal increments. You can pass the cells function a single number which will create equal increments for that number of steps, or an array of the [specific steps](#color-linear-custom) you want the legend to display.

symbol.**orient(string)**

Accepts "vertical" or "horizontal" for legend orientation. Default set to "vertical."

symbol.**shapePadding()**

Applies to all shapes. Determines vertical or horizontal spacing between shapes depending on the respective orient setting. Default set to 2px.

symbol.**labels([string])**

Sets the legend labels to the array of strings passed to the legend. If the array is not the same length as the array the legend calculates, it merges the values and gives the calculated labels for the remaining items. An example: [Size - Linear Scale Legend, Lines](#size-line).

symbol.**labelAlign(string)**

Only used if the legend's orient is set to "horizontal." Accepts "start", "middle", or "end" as inputs to determine if the labels are aligned on the left, middle or right under the symbol in a horizontal legend. An example: [Size - Linear Scale Legend, Lines](#size-line).

symbol.**labelFormat(d3.format)**

Takes a [d3.format](https://github.com/mbostock/d3/wiki/Formatting) and applies that styling to the legend labels. Default is set to `d3.format(".01f")`.

symbol.**labelOffset(number)**

A value that determines how far the label is from the symbol in each legend item. Default set to 10px.

symbol.**labelDelimiter(string)**

Change the default "to" text when working with a quant scale.

symbol.**on(string, function)**

There are three custom event types you can bind to the legend: "cellover", "cellout", and "cellclick" An exampe: [Symbol - Ordinal Scale](#symbol-ordinal)

