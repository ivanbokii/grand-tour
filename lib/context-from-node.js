var utils = require('./utils');
var _ = require('lodash');

var contextFetchers = {
  'ExpressionStatement': expressionStatement,
  'VariableDeclaration': variableDeclaration,
  'AssignmentExpression': assignmentExpression
};

exports.get = function(node) {
  var fetcher = contextFetchers[node.type];

  if (!fetcher) {
    console.log('No fetcher for the node type: ', node.type);
    return {};
  }

  return fetcher(node);
};

function expressionStatement(node) {
  if (utils.canReadCallExpression(node.expression) && utils.isCharabancRegisterOrRequest(node.expression)) {
    return {
      type: 'global'
    };
  }

  var subFetcher = contextFetchers[node.expression.type];

  if (subFetcher) {
    return subFetcher(node.expression);
  }
}

function variableDeclaration(node) {
  objectNameNode = _.first(node.declarations, function(subNode) {
    return subNode.type === 'VariableDeclarator';
  })[0];

  var objectName = objectNameNode.id.name;

  methodNameNode = _.first(objectNameNode.init.properties, function(property) {
    return property.type === 'Property';
  })[0];

  var methodName = methodNameNode.key.name;

  return {
    type: 'function',
    name: methodName,
    object: objectName
  };
}

function assignmentExpression(node) {
  var left = node.left;

  return {
    type: 'function',
    name: left.property.name,
    object: left.object.name
  };
}
