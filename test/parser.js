var expect = require('chai').expect;
var parse = require('../lib/parser');

describe('charabanc-ast-parser', function() {
  it('should parse fixtures', function() {
    var code = require('fs').readFileSync('./test/fixtures/parser-fixtures.js', 'utf8');

    var output = [{
      route: 'mochaccino',
      type: 'request',
      context: {
        type: 'global'
      }
    }, {
      route: 'latte',
      type: 'request',
      context: {
        type: 'function',
        name: 'prop',
        object: 'someObject'
      }
    }, {
      route: 'icedcoffee',
      type: 'request',
      context: {
        type: 'function',
        name: 'anotherProp',
        object: 'someObject'
      }
    }, {
      route: 'cappuccino',
      type: 'request',
      context: {
        type: 'function',
        name: 'func',
        object: 'someObject'
      }
    }, {
      route: 'espressino',
      type: 'request',
      context: {
        type: 'function',
        name: 'func',
        object: 'someObject'
      }
    }, {
      route: 'espressino',
      type: 'request',
      context: {
        type: 'function',
        name: 'func',
        object: 'someObject'
      }
    }, {
      route: 'redeye',
      type: 'request',
      context: {
        type: 'function',
        name: 'func',
        object: 'someObject'
      }
    }, {
      route: 'irishcoffee',
      type: 'request',
      context: {
        type: 'function',
        name: 'func',
        object: 'someObject'
      }
    }, {
      route: 'pocillo',
      type: 'register',
      context: {
        type: 'global'
      }
    }, {
      route: 'macchiato',
      type: 'request',
      context: {
        type: 'function',
        name: 'register',
        object: 'charabanc'
      }
    }];

    expect(parse(code)).to.deep.equal(output);
  });
});
