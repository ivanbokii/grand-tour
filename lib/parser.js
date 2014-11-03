var _ = require('lodash');
var esprima = require('esprima');
var traverse = require('ast-traverse');
var contextFromNode = require('./context-from-node');
var utils = require('./utils');

module.exports = function(source) {
  var ast = esprima.parse(source);
  var charabancNodesWithContext = [];

  traverse(ast, {pre: function(node) {
    if (node.type === 'CallExpression' &&
        utils.canReadCallExpression(node) &&
        utils.isCharabancRegisterOrRequest(node)) {

      if (!utils.canFetchArguments(node)) {
        //TODO add more information about the context
        console.log('No arguments in the charabanc call');
        return;
      }

      var root = findRoot(ast, node);
      var context = contextFromNode.get(root);
      var nodeWithContext = createNodeWithContext(node, context);

      charabancNodesWithContext.push(nodeWithContext);
    }
  }});

  return charabancNodesWithContext;
};


function findRoot(ast, nodeToFind) {
  var parents = [];
  var skipRest = false;

  traverse(ast, {pre: function(node, parent) {
    if (_.isEqual(node, nodeToFind)) {
      skipRest = true;
    }

    if (parent) {
      if (isNewBranch(parent, parents.length, skipRest)) {
        parents = [];
      }
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

function isNewBranch(node, numberOfParents, isSkipping) {
  return node.type === 'Program' && numberOfParents > 0 && !isSkipping;
}

function createNodeWithContext(node, context) {
  var nodeWithContext = {};
  var callProperty = node.callee.property;

  nodeWithContext.type = callProperty.name;
  nodeWithContext.route = node.arguments[0].value;
  nodeWithContext.context = context;

  return nodeWithContext;
}
