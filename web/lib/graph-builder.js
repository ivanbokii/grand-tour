var graphBuilder = {
  build: function(nodesWithContext) {
    var routingTable = this.buildRoutingTable(nodesWithContext);
    var graph = this.buildGraph(nodesWithContext, routingTable);

    return graph;
  },

  buildRoutingTable: function(nodesWithContext) {
    var routingTable = {
      request: {},
      register: {} 
    };
    
    _.each(nodesWithContext, function(nwc) {
      _.each(nwc.nodes, function(node) {
        this.addRouteToRoutingTable(routingTable, node, nwc);
      }, this);
      
    }, this);
    return routingTable;
  },

  buildGraph: function(nodesWithContext, routingTable) {
    _.each(nodesWithContext, function(nwc) {
      _.chain(nwc.nodes)
        .filter(function(node) {
          return node.type === 'request';
        })
        .each(function(node) {
          node.subscribers = [];
          node.subscribers.push(routingTable['register'][node.route]);
          node.subscribers = _.flatten(node.subscribers);
        });
    });
    return nodesWithContext;
  },

  addRouteToRoutingTable: function(routingTable, node, nodeWithContext) {
    if (!_.has(routingTable[node.type], node.route)) {
      routingTable[node.type][node.route] = [];
    }

    routingTable[node.type][node.route].push(nodeWithContext);
  }
};
