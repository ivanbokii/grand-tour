var expect = require('chai').expect;

describe('charabanc-ast-parser', function() {

  var lib = require('../lib/charabanc-ast-parser');

  it('should parse call in a callback which is an argument to a function', function() {
    var code = require('fs').readFileSync('./fixtures/call-in-func-as-argument', 'utf8');

    var output = [{
      route: 'cappuccino',
      type: request,
      context: {
        type: 'function',
        name: 'func',
        object: 'someObject'
      }
    }];

    expect(lib(code)).to.deep.equal();
  });
});
