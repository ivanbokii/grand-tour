var _ = require('lodash');
var expect = require('chai').expect;
var extractNodes = require('../lib');


describe('extract-nodes', function() {
  it.only('should extract nodes', function(done) {
    var mainResult ={
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
    }; 

    var utilsResult = {
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
    }; 

    var accountsResult ={
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
    }; 

    var usersResult = {
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
    };
    
    extractNodes('./test/fixtures/project-fixture', function(err, results) {
      expect(results.errors.length).to.equal(0);
      expect(results.results.length).to.equal(4);
      
      var main = _.find(results.results, function(r) {
        return r.context.object == 'main';
      });
      expect(main).to.deep.equal(mainResult);
      
      var utils = _.find(results.results, function(r) {
        return r.context.object == 'utils';
      });
      expect(utils).to.deep.equal(utilsResult);
      
      var accounts = _.find(results.results, function(r) {
        return r.context.object == 'accounts';
      });
      expect(accounts).to.deep.equal(accountsResult);
      
      var users = _.find(results.results, function(r) {
        return r.context.object == 'users';
      });
      expect(users).to.deep.equal(usersResult);
      
      done();
    });
  });

  it('should return parsing errors if any', function(done) {
    extractNodes('./test/fixtures/project-fixture-with-errors', function(err, results) {
      var expectedError = "Illegal return statement";
      var mainResult = {
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
      };

      var utilsResult ={
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
      }; 
      
      expect(results.errors.length).to.equal(2);
      _.each(results.errors, function(entry) {
        expect(entry.error.description).to.equal(expectedError);
      });
      
      
      expect(results.results.length).to.equal(2);
      
      var main = _.find(results.results, function(r) {
        return r.context.object == 'main';
      });
      expect(main).to.deep.equal(mainResult);
      
      var utils = _.find(results.results, function(r) {
        return r.context.object == 'utils';
      });
      expect(utils).to.deep.equal(utilsResult);
      
      done();
    });
  });
});
