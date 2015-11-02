d3.legend.**size()**

Constructs a new size legend. The legend component expects a d3 scale as the basic input, but also has a number of optional parameters for changing the default display such as vertical or horizontal orientation, shape of the symbol next to the label, symbol sizing, and label formatting.

size.**scale(d3.scale)**

Creates a new d3 legend based on the scale. The code determines the type of scale and generates the different symbol and label pairs. Expects a scale that has a numerical range.

size.**cells(number or [numbers])**

This parameter is only valid for continuous scales (like linear and log). When there is no indication from the domain or range for the number of steps in the legend you may want to display, it defaults to five steps in equal increments. You can pass the cells function a single number which will create equal increments for that number of steps, or an array of the [specific steps](#color-linear-custom) you want the legend to display.

size.**orient(string)**

Accepts "vertical" or "horizontal" for legend orientation. Default set to "vertical."

size.**ascending(boolean)**

If you pass this a true, it will reverse the order of the scale.

size.**shape(string)**

Accepts "rect", "circle", or "line". Defaults to "rect." The assumption is that the scale's output will be used for the width and height if you select "rect," the radius if you select "circle," and the stroke-width if you select "line." If you want to have a custom shape of different sizes in your legend, use the symbol legend and make each path string for the sizes you want as the range array.

size.**shapeWidth(number)**

Only applies to shape "line." Default set to 15px.

size.**shapePadding(number)**

Applies to all shapes. Determines vertical or horizontal spacing between shapes depending on the respective orient setting. Default set to 2px.

size.**classPrefix(string)**

Adds this string to the beginning of all of the components of the legend that have a class. This allows for namespacing of the classes.

size.**title(string)**

Sets the legend's title to the string. Automatically moves the legend cells down based on the size of the title. An example: [Symbol - Ordinal Scale](#symbol-ordinal).

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
