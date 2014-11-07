var visualExporter = {
  buildVisual: function(graph) {
    var visual = {
      nodes: [],
      edges: []
    };

    var roots = this.findAllRootNodes(graph);

    _.each(roots, function(node) {
      this.bfs(node, visual);
    }, this);

    return visual;
  },

  //Goes through graph and finds nodes with context without any
  //registrations. These are considered as roots
  findAllRootNodes: function(graph) {
    var roots = _.filter(graph, function(node) {
      var hasRegisters = _.any(node.nodes, function(subNode) {
        return subNode.type === 'register';
      });

      return !hasRegisters;
    });

    return roots;
  },

  //breadth first graph traversal
  bfs: function(node, visual) {
    var queue = [node];
    //level in graph's hierarchy
    node.level = 0;

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

          s.level = currentNode.level + 1;
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
      label: id,
      level: node.level
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
