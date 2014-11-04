var _ = require('lodash');

module.exports = function(nodes) {
  var nodesMap = createNodesMap(nodes);

  return splice(nodesMap);
};

function createNodesMap(nodes) {
  var map = {};

  _.each(nodes, function(node) {
    var mapName = createMapNameFor(node);

    if(!_.has(map, mapName)) {
      map[mapName] = [node];
    } else {
      map[mapName].push(node);
    }
  });

  return map;
}

function createMapNameFor(node) {
  var context = node.context;
  return context.object + '.' + context.name + '#' + context.type;
}

function splice(nodesMap) {
  return _.map(nodesMap, function(mapItems) {
    var splicedNode = {
      context: mapItems[0].context
    };

    splicedNode.nodes = _.map(mapItems, function(item) {
      return _.omit(item, 'context');
    });

    return splicedNode;
  });
}
