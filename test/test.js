/*eslint-env mocha*/
const chai = require('chai');
const { expect } = chai;
import color from '../src/color';
import helper from '../src/legend';

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
});
