## Color
### Documentation
d3.legend.**color()**

Constructs a new color legend. The legend component expects a d3 scale as the basic input, but also has a number of optional parameters for changing the default display such as vertical or horizontal orientation, shape of the symbol next to the label, symbol sizing, and label formatting. See the following documentation for specific functions.

color.**scale(d3.scale)**

Creates a new d3 legend based on the scale. The code determines the type of scale and generates the different symbol and label pairs.

color.**cells(number or [numbers])**

This parameter is only valid for [quantitative scales](https://github.com/mbostock/d3/wiki/Quantitative-Scales#quantitative) (minus quantize and quantile). With a linear scale there is no indication from the range for the number of steps in the legend you may want to display. The default number of steps is 5 in equal increments. You can pass the cells function a single number which will create equal increments in those steps, or an array of the [specific steps](#color-linear-custom) you want the legend to display.

color.**orient(string)**

Accepts "vertical" or "horizontal" for legend orientation. Default set to "vertical."

color.**useClass(boolean)**

The default behavior is for the legend to set the fill of the legend's symbols. If you set useClass to `true` then it will apply the scale's output as classes to the shapes instead of the fill.


color.**shape(string[, path-string])**

Accepts "rect", "circle", "line", or "path". If you choose "path," you must also pass a second parameter for the path string, [an example](). Defaults to "rect."

color.**shapeWidth(number)**

Only applies to shape of "rect" or "line." Default set to 15px.

color.**shapeHeight(number)**

Only applies to shape of "rect." Default set to 15px.

color.**shapeRadius(number)**

Only applies to shape of "circle." Default set to 10px.

color.**shapePadding(number)**

Applies to all shapes. Determines vertical or horizontal spacing between shapes depending on the respective orient setting. Default set to 2px.

color.**labels([string])**

Sets the legend labels to the array of strings passed to the legend. If the array is not the same length as the array the legend calculates, it merges the values and gives the calculated labels for the remaining items, an example.

color.**labelFormat(d3.format)**

Takes a [d3.format](https://github.com/mbostock/d3/wiki/Formatting) and applies that styling to the legend labels. Default is set to d3.format(".01f")

color.**labelOffset(number)**

A value that determines how far the label is from the symbol in each legend item. Default set to 10px.

### Examples

## Size
### Documentation
d3.legend.**size()**

size.**scale(d3.scale)**

Creates a new d3 legend based on the scale. The code determines the type of scale and generates the different symbol and label pairs.

size.**cells(number or [numbers])**

This parameter is only valid for [quantitative scales](https://github.com/mbostock/d3/wiki/Quantitative-Scales#quantitative) (minus quantize and quantile). With a linear scale there is no indication from the range for the number of steps in the legend you may want to display. The default number of steps is 5 in equal increments. You can pass the cells function a single number which will create equal increments in those steps, or an array of the [specific steps](#color-linear-custom) you want the legend to display.

size.**shape(string[, path-string])**

Accepts "rect", "circle", "line", or "path". If you choose "path," you must also pass a second parameter for the path string, [an example](). Defaults to "rect."


size.**shapePadding(number)**

Applies to all shapes. Determines vertical or horizontal spacing between shapes depending on the respective orient setting. Default set to 2px.

size.**labels([string])**

Sets the legend labels to the array of strings passed to the legend. If the array is not the same length as the array the legend calculates, it merges the values and gives the calculated labels for the remaining items, an example.

size.**labelFormat(d3.format)**

Takes a [d3.format](https://github.com/mbostock/d3/wiki/Formatting) and applies that styling to the legend labels. Default is set to d3.format(".01f")

size.**labelOffset(number)**

A value that determines how far the label is from the symbol in each legend item. Default set to 10px.

### Examples

## Symbol
### Documentation
d3.legend.**symbol()**

Creates a new d3 legend based on the scale. The code determines the type of scale and generates the different symbol and label pairs.

symbol.**scale()**

Creates a new d3 legend based on the scale. The code determines the type of scale and generates the different symbol and label pairs.

symbol.**cells()**

This parameter is only valid for [quantitative scales](https://github.com/mbostock/d3/wiki/Quantitative-Scales#quantitative) (minus quantize and quantile). With a linear scale there is no indication from the range for the number of steps in the legend you may want to display. The default number of steps is 5 in equal increments. You can pass the cells function a single number which will create equal increments in those steps, or an array of the [specific steps](#color-linear-custom) you want the legend to display.

symbol.**shapePadding()**

Applies to all shapes. Determines vertical or horizontal spacing between shapes depending on the respective orient setting. Default set to 2px.

symbol.**labels([string])**

Sets the legend labels to the array of strings passed to the legend. If the array is not the same length as the array the legend calculates, it merges the values and gives the calculated labels for the remaining items, an example.

symbol.**labelFormat(d3.format)**

Takes a [d3.format](https://github.com/mbostock/d3/wiki/Formatting) and applies that styling to the legend labels. Default is set to d3.format(".01f")

symbol.**labelOffset(number)**

A value that determines how far the label is from the symbol in each legend item. Default set to 10px.

- new features
- change size legend function to automatically do line width
- Check how custom path does with size
- align labels for size legend
