/*eslint-env mocha*/
const chai = require('chai');
const { expect } = chai;
import size from '../src/size';
import helper from '../src/legend';
import { formatLocale, format } from 'd3-format'

describe('d3-legend #legendSize', function() {
	it('exports a function', function() {
		expect(size).to.be.a('function');
	});

  it('should have a locale', function () {
    let result = size();
    expect(result.locale).to.be.a('function');
  });

  it('should redefine label\'s format with a string', function () {
    let result = size();
    let testValue = 1.00;
    let initial = result.labelFormat();

    result.labelFormat('.2f');

    expect(initial(testValue)).to.be.not.equal(result.labelFormat()(testValue));
    expect(result.labelFormat()(testValue)).to.be.equal('1.00');
  });

  it('should redefine label\'s format with a format function', function () {
    let result = size();
    let testValue = 1.00;
    let initial = result.labelFormat();
    result.labelFormat(format('.2f'));

    expect(initial(testValue)).to.be.not.equal(result.labelFormat()(testValue));
    expect(result.labelFormat()(testValue)).to.be.equal('1.00');
  });

  it('should redefine the locale with a new locale definition', function () {
    let result = size();
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
    let result = size();
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
