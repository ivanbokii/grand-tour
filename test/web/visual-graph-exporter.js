describe('visual-graph-exporter', function() {
  it('should extract visual representation of the graph', function() {
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

    var expectedNodes = [
      {
        "id": "test/fixtures/project-fixture/main.js>function>main.init",
        "label": "test/fixtures/project-fixture/main.js>function>main.init",
        "level": 0
      },
      {
        "id": "test/fixtures/project-fixture/lib/users.js>function>users.init",
        "label": "test/fixtures/project-fixture/lib/users.js>function>users.init",
        "level": 1
      },
      {
        "id": "test/fixtures/project-fixture/utils.js>function>utils.init",
        "label": "test/fixtures/project-fixture/utils.js>function>utils.init",
        "level": 1
      },
      {
        "id": "test/fixtures/project-fixture/lib/accounts.js>function>accounts.init",
        "label": "test/fixtures/project-fixture/lib/accounts.js>function>accounts.init",
        "level": 2
      }
    ];

    var expectedEdges = [
      {
        "from": "test/fixtures/project-fixture/main.js>function>main.init",
        "to": "test/fixtures/project-fixture/lib/users.js>function>users.init",
        "label": "users-info"
      },
      {
        "from": "test/fixtures/project-fixture/main.js>function>main.init",
        "to": "test/fixtures/project-fixture/utils.js>function>utils.init",
        "label": "dump-info"
      },
      {
        "from": "test/fixtures/project-fixture/lib/users.js>function>users.init",
        "to": "test/fixtures/project-fixture/lib/accounts.js>function>accounts.init",
        "label": "get-users-account-info"
      }
    ];

    var graph = graphBuilder.build(nodesDescription.results);
    var visual = visualExporter.buildVisual(graph);

    expect(visual.nodes).to.deep.equal(expectedNodes);
    expect(visual.edges).to.deep.equal(expectedEdges);
  });
});
