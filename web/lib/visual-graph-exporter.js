var visualExporter = {
  buildVisual: function(graph) {
    var visual = {
      nodes: [],
      edges: []
    };

    _.each(graph, function(node) {
      if (node.processed) {
        return;
      }

      this.bfs(node, visual);
    }, this);

    return visual;
  },

  bfs: function(node, visual) {
    var queue = [node];

    while (queue.length > 0) {
      var currentNode = queue.pop();
      
      if (currentNode.processed) {
        continue;
      }
      
      var visualNode = this.extractNodeVisualInfo(currentNode);
      visual.nodes.push(visualNode);

      _.chain(currentNode.nodes)
      .filter(function(subNode) {
        return subNode.subscribers && subNode.subscribers.length > 0;
      })
      .each(function(subNode) {
        _.each(subNode.subscribers, function(s) {
          var visualEdge = this.extractEdgeVisualInfo(subNode, currentNode, s);
          visual.edges.push(visualEdge);

          queue.unshift(s);
        }, this);
      }, this);
        
      currentNode.processed = true;
    }

    return visual;
  },

  extractNodeVisualInfo: function(node) {
    var name;
    if (node.context.object) {
      name = node.context.object + '.' + node.context.name;
    } else {
      name = node.context.name;
    }

    var id = node.file + '>' + node.context.type + '>' + name;
    
    return {
      id: id,
      label: id
    };
  },

  extractEdgeVisualInfo: function(edgeInfo, node, connectedNode) {
    var parentVisual = this.extractNodeVisualInfo(node);
    var childVisual = this.extractNodeVisualInfo(connectedNode);

    return {
      from: parentVisual.id,
      to: childVisual.id,
      label: edgeInfo.route
    };
  }
};
