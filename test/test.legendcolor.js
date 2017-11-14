/*eslint-env mocha*/
const chai = require('chai');
const { expect } = chai;
import color from '../src/color';
import helper from '../src/legend';
import { formatLocale, format } from 'd3-format'

// describe('d3-legend', function () {
//     var d3Legend

//     beforeEach(function () {
//         d3Legend = require('../no-extend')
//     })

//     it('should export an object', function () {
//         expect(d3Legend).to.be.an('object')
//     })

//     it('should have color, size & symbol functions', function () {
//         ['color','size','symbol'].forEach(function (fieldName) {
//             expect(d3Legend[fieldName]).to.be.a('function')
//         })
//     })
// })
describe('d3-legend #legendColor', function() {
	it('exports a function', function() {
		expect(color).to.be.a('function');
	});
	it('invoking exported function does not throw an error and returns a legend function', function() {
		let result;
		expect(color).to.be.a('function');
		expect(function() {
			result = color();
		}).to.not.throw();
		expect(result).to.be.a('function');
		expect(result.name).to.equal('legend');
	});
	it('errors when not passed a SVG', function() {
		let result;
		expect(color).to.be.a('function');
		expect(function() {
			result = color();
		}).to.not.throw();
		expect(result).to.be.a('function');
		expect(result.name).to.equal('legend');
		// TODO add formal error handling and assert on error message
		// }).to.throw('need to provide SVG');
		expect(function() {
			result();
		}).to.throw();
	});
	// TODO renable to create failing assertion to verify shapes.data is rebound
	it.skip('properly rebinds the updated range data for the legend shapes', function() {
		let result, aLegend;
		let mockSvg = {
			attr(key, val) {
				this._attrs[key] = val;
				return this;
			},
			select() { return this; },
			append() { return this; },
			enter() { return this; },
			data() { return this; },
			selectAll() {
				return this;
			}
		};
		mockSvg._attrs = {};
		this._copied = helper.d3_calcType;
		helper.d3_calcType = null;
		helper.d3_calcType = function() {
			expect(arguments.length).to.equal(6);
			return {};
		};


		expect(color).to.be.a('function');
		expect(function() {
			result = color();
		}).to.not.throw();
		expect(result).to.be.a('function');
		expect(result.name).to.equal('legend');
		// TODO add formal error handling and assert on error message
		// }).to.throw('need to provide SVG');
		expect(function() {
			aLegend = result(mockSvg);
		}).to.not.throw();
		expect(aLegend).to.be.an('Object');
	});

  it('should have a locale', function () {
    let result = color();
    expect(result.locale).to.be.a('function');
  });

  it('should redefine label\'s format with a string', function () {
    let result = color();
    let testValue = 1.00;
    let initial = result.labelFormat();

    result.labelFormat('.2f');

    expect(initial(testValue)).to.be.not.equal(result.labelFormat()(testValue));
    expect(result.labelFormat()(testValue)).to.be.equal('1.00');
  });

  it('should redefine label\'s format with a format function', function () {
    let result = color();
    let testValue = 1.00;
    let initial = result.labelFormat();
    result.labelFormat(format('.2f'));

    expect(initial(testValue)).to.be.not.equal(result.labelFormat()(testValue));
    expect(result.labelFormat()(testValue)).to.be.equal('1.00');
  });

  it('should redefine the locale with a new locale definition', function () {
    let result = color();
    let testValue = 1.00;

    let initial = result.labelFormat();
    let frFr = {
      decimal: ',',
      thousands: '.',
      grouping: [3],
      currency: ['', '\u00a0€'],
      percent: "\u202f%"
    };

    result.locale(frFr)
    expect(initial(testValue)).to.be.not.equal(result.labelFormat()(testValue));
    expect(result.labelFormat()(testValue)).to.be.equal('1,0')
  })

  it('should keep the format specifier after a locale update', function () {
    let result = color();
    let testValue = 1.00;

    let initial = result.labelFormat();
    let frFr = {
      decimal: ',',
      thousands: '.',
      grouping: [3],
      currency: ['', '\u00a0€'],
      percent: "\u202f%"
    };

    result.labelFormat(format('.2f'));
    result.locale(frFr)
    expect(initial(testValue)).to.be.not.equal(result.labelFormat()(testValue));
    expect(result.labelFormat()(testValue)).to.be.equal('1,00')
  })
});
