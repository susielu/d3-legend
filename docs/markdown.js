var md = require('marked');

var contents = require('./contents.md')
var color = require('./color.md');
var size = require('./size.md');
var symbol = require('./symbol.md');

document.getElementById('contents-md').innerHTML = md(contents);
document.getElementById('color-md').innerHTML = md(color);
document.getElementById('size-md').innerHTML = md(size);
document.getElementById('symbol-md').innerHTML = md(symbol);