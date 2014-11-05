var expect = require('chai').expect;
var extractNodes = require('../lib');


describe('extract-nodes', function() {
  it('should extract nodes', function(done) {
    var output = {
      errors: [],
      results: [{
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
      }, {
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
      }, {
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
      }, {
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
      }]};

    extractNodes('./test/fixtures/project-fixture', function(err, results) {
      expect(results).to.deep.equal(output);
      done();
    });
  });

  it('should return parsing errors if any', function(done) {
    extractNodes('./test/fixtures/project-fixture-with-errors', function(err, results) {
      var output = {
        "errors": [
          {
            "file": "test/fixtures/project-fixture-with-errors/lib/accounts.js",
            "error": {
              "index": 217,
              "lineNumber": 12,
              "column": 7,
              "description": "Illegal return statement"
            }
          },
          {
            "file": "test/fixtures/project-fixture-with-errors/lib/users.js",
            "error": {
              "index": 274,
              "lineNumber": 14,
              "column": 7,
              "description": "Illegal return statement"
            }
          }
        ],
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
            "file": "test/fixtures/project-fixture-with-errors/main.js"
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
            "file": "test/fixtures/project-fixture-with-errors/utils.js"
          }
        ]
      };
      
      expect(results.errors.length).to.equal(2);
      expect(results.errors).to.deep.equal(output.errors);
      expect(results.results.length).to.equal(2);
      expect(results.results).to.deep.equal(output.results);
      done();
    });
  });
});
