var expect = require('chai').expect;
var parse = require('../lib/parser');

describe('charabanc-ast-parser', function() {
  it('should parse fixtures', function() {
    var code = require('fs').readFileSync('./test/fixtures/parser-fixtures.js', 'utf8');

    var output = [{
      type: 'request',
      route: 'mochaccino',
      context: {
        type: 'function-call',
        name: 'request',
        object: 'charabanc'
      }
    }, {
      type: 'request',
      route: 'latte',
      context: {
        type: 'function',
        name: 'prop',
        object: 'someObject'
      }
    }, {
      type: 'request',
      route: 'icedcoffee',
      context: {
        type: 'function',
        name: 'anotherProp',
        object: 'someObject'
      }
    }, {
      type: 'request',
      route: 'cappuccino',
      context: {
        type: 'function-call',
        name: 'func',
        object: 'someObject'
      }
    }, {
      type: 'request',
      route: 'espressino',
      context: {
        type: 'function-call',
        name: 'func',
        object: 'someObject'
      }
    }, {
      type: 'request',
      route: 'redeye',
      context: {
        type: 'function-call',
        name: 'func',
        object: 'someObject'
      }
    }, {
      type: 'request',
      route: 'irishcoffee',
      context: {
        type: 'function-call',
        name: 'func',
        object: 'someObject'
      }
    }, {
      type: 'register',
      route: 'pocillo',
      context: {
        type: 'function-call',
        name: 'register',
        object: 'charabanc'
      }
    }, {
      type: 'request',
      route: 'macchiato',
      context: {
        type: 'function-call',
        name: 'register',
        object: 'charabanc'
      }}];

    expect(parse(code)).to.deep.equal(output);
  });
});
