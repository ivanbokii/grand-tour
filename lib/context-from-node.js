var utils = require('./utils');

var contextFetchers = {
  'ExpressionStatement': expressionStatement
};

exports.get = function(node) {
  var fetcher = contextFetchers[node.type];

  if (!fetcher) {
    console.log('No fetcher for the node type: ', node.type);
    return null;
  }
  
  return fetcher(node);
};

function expressionStatement(node) {
  if (utils.canReadCallExpression(node.expression) && utils.isCharabancRegisterOrRequest(node.expression)) {
    return {
      type: 'global'
    };
  }
  
  // console.log(JSON.stringify(node, '', 2));
}
