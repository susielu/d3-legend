const chai   = require('chai')
const expect = chai.expect

describe('d3-legend', function () {
    var d3Legend

    beforeEach(function () {
        d3Legend = require('../no-extend')
    })

    it('should export an object', function () {
        expect(d3Legend).to.be.an('object')
    })

    it('should have color, size & symbol functions', function () {
        ['color','size','symbol'].forEach(function (fieldName) {
            expect(d3Legend[fieldName]).to.be.a('function')
        })
    })
})