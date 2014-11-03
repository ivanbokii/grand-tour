var _ = require('lodash');
var esprima = require('esprima');
var traverse = require('ast-traverse');

module.exports = function(source) {
  var ast = esprima.parse(source);
  
  traverse(ast, {pre: function(node) {
    if (node.type === 'CallExpression' &&
        canReadCallExpression(node) &&
        isCharabancRegisterOrRequest(node)) {

      if (!canFetchArguments(node)) {
        //TODO add more information about the context
        console.log('No arguments in the charanc call');
      }

      var root = findRoot(ast, node);
      console.log(root.type);
    }
  }}); 
};

function canReadCallExpression(callExpression) {
  return callExpression &&
    callExpression.callee &&
    callExpression.callee.object &&
    callExpression.callee.property;
}

function isCharabancRegisterOrRequest(callExpression) {
  var callObject = callExpression.callee.object;
  var callProperty = callExpression.callee.property;
  
  return callObject.name === 'charabanc' &&
    (callProperty.name === 'request' ||
    callProperty.name === 'register');
}

function canFetchArguments(callExpression) {
  return callExpression.arguments;
}

function findRoot(ast, nodeToFind) {
  var parents = [];
  var skipRest = false;
  
  traverse(ast, {pre: function(node, parent) {
    if (_.isEqual(node, nodeToFind)) {
      console.log('FOUND');
      skipRest = true;
    }

    if (parent) {
      parents.push(parent);
    }
  }, skipProperty: function() {
    return skipRest;
  }});

  if (parents.length < 2) {
    return null;
  }

  //skip the top Program node
  return parents[1];
}
