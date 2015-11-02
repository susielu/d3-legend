d3.legend.**symbol()**

Constructs a new symbol legend. The legend component expects a d3 scale as the basic input, but also has a number of optional parameters for changing the default display such as vertical or horizontal orientation, shape of the symbol next to the label, symbol sizing, and label formatting.

symbol.**scale()**

Creates a new d3 legend based on the scale. The code determines the type of scale and generates the different symbol and label pairs. The scale's range will be used as the d-attribute in an svg path for each symbol in the legend.

symbol.**cells()**

This parameter is only valid for continuous scales (like linear and log). When there is no indication from the domain or range for the number of steps in the legend you may want to display, it defaults to five steps in equal increments. You can pass the cells function a single number which will create equal increments for that number of steps, or an array of the [specific steps](#color-linear-custom) you want the legend to display.

symbol.**orient(string)**

Accepts "vertical" or "horizontal" for legend orientation. Default set to "vertical."

symbol.**ascending(boolean)**

If you pass this a true, it will reverse the order of the scale.

symbol.**shapePadding()**

Applies to all shapes. Determines vertical or horizontal spacing between shapes depending on the respective orient setting. Default set to 2px.

symbol.**classPrefix(string)**

Adds this string to the beginning of all of the components of the legend that have a class. This allows for namespacing of the classes.

symbol.**title(string)**

Sets the legend's title to the string. Automatically moves the legend cells down based on the size of the title. An example: [Symbol - Ordinal Scale](#symbol-ordinal).

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
