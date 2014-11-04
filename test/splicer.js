var expect = require('chai').expect;
var parse = require('../lib/parser');
var splice = require('../lib/splicer');

describe('ast-parser-output-splicer', function() {
  it('should splice nodes with the same context', function() {
    var code = require('fs').readFileSync('./test/fixtures/splicer-fixtures.js', 'utf8');

    var output = [{
      context: {
        type: 'function-call',
        name: 'func',
        object: 'someObject'
      },
      nodes: [{
        type: 'register',
        route: 'ripley'
      }, {
        type: 'request',
        route: 'ash'
      }, {
        type: 'request',
        route: 'parker'
      }]
    }, {
      context: {
        type: 'function',
        name: 'property',
        object: 'someObject'
      },
      nodes: [{
        type: 'request',
        route: 'hello'
      }, {
        type: 'request',
        route: 'world'
      }]
    }];

    expect(splice(parse(code))).to.deep.equal(output);
  });

  it('should transform node into the spliced format even if not splicing occurs', function() {
    var code = 'function test() {  charabanc.register("predator", function() {}); }';
    var output = [{
      context: {
        type: 'function',
        name: 'test'
      },
      nodes: [{
        type: 'register',
        route: 'predator'
      }]
    }];
    
    expect(splice(parse(code))).to.deep.equal(output);
  });
});
