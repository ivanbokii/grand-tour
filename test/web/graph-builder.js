describe('graph-builder', function() {
  it('should build graph from nodes info', function() {
    var nodesDescription = {
      "errors": [],
      "results": [
        {
          "context": {
            "type": "function",
            "name": "init",
            "object": "main"
          },
          "nodes": [
            {
              "type": "request",
              "route": "users-info"
            },
            {
              "type": "request",
              "route": "dump-info"
            }
          ],
          "file": "test/fixtures/project-fixture/main.js"
        },
        {
          "context": {
            "type": "function",
            "name": "init",
            "object": "utils"
          },
          "nodes": [
            {
              "type": "register",
              "route": "dump-info"
            }
          ],
          "file": "test/fixtures/project-fixture/utils.js"
        },
        {
          "context": {
            "type": "function",
            "name": "init",
            "object": "accounts"
          },
          "nodes": [
            {
              "type": "register",
              "route": "get-users-account-info"
            }
          ],
          "file": "test/fixtures/project-fixture/lib/accounts.js"
        },
        {
          "context": {
            "type": "function",
            "name": "init",
            "object": "users"
          },
          "nodes": [
            {
              "type": "register",
              "route": "users-info"
            },
            {
              "type": "request",
              "route": "get-users-account-info"
            }
          ],
          "file": "test/fixtures/project-fixture/lib/users.js"
        }
      ]
    };

    var subscribers;
    var files;
    var graph = graphBuilder.build(nodesDescription.results);

    //check main node
    var main = getNode(graph, 'test/fixtures/project-fixture/main.js'); 
    subscribers = getSubscribers(main);
    files = getSubscribersFiles(subscribers);
    
    expect(files.length).to.equal(2);
    expect(files).to.include('test/fixtures/project-fixture/lib/users.js');
    expect(files).to.include('test/fixtures/project-fixture/utils.js');

    //check users node
    var users = getNode(graph, 'test/fixtures/project-fixture/lib/users.js'); 
    subscribers = getSubscribers(users);
    files = getSubscribersFiles(subscribers);
    
    expect(files.length).to.equal(1);
    expect(files).to.include('test/fixtures/project-fixture/lib/accounts.js');
    
    //check utils node
    var utils = getNode(graph, 'test/fixtures/project-fixture/utils.js'); 
    subscribers = getSubscribers(utils);
    files = getSubscribersFiles(subscribers);
    
    expect(files.length).to.equal(0);
    
    //check accounts node
    var accounts = getNode(graph, 'test/fixtures/project-fixture/lib/accounts.js'); 
    subscribers = getSubscribers(accounts);
    files = getSubscribersFiles(subscribers);
    
    expect(files.length).to.equal(0);
  });

  function getNode(graph, nodeFileName) {
    return _.find(graph, function(node) {
      return node.file == nodeFileName;
    });
  }

  function getSubscribers(nodeWithContext) {
    return _.chain(nodeWithContext.nodes)
    .map(function(node) {
      return node.subscribers;
    })
    .flatten()
    .compact()
    .value();
  }

  function getSubscribersFiles(subscribers) {
    return _.map(subscribers, function(node) {
      return node.file;
    });
  }
});
