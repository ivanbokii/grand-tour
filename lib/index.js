var parse = require('./parser');
var splice = require('./splicer');
var fs = require('fs');
var _ = require('lodash');
var async = require('async');
var findit = require('findit');
var path = require('path');
var colors = require('colors');

module.exports = function(projectRootPath, callback) {
  var finder = findit(projectRootPath);
  var isSkipping = false;
  var files = [];

  finder.on('file', function(file) {
    if (file.indexOf('.git') != -1 ||
        file.indexOf('node_modules') != -1 ||
        path.extname(file) != '.js') {
      return;
    }

    files.push(file);
  });

  finder.on('end', function() {
    async.reduce(files, { errors: [], results: [] }, function(endResult, file, asyncCallback) {
      parseFile(file, function(err, nodes, parsingError) {
        if (err) {
          asyncCallback(err);
          return;
        }

        var parsingResults = handleParsingResults(file, nodes, parsingError);
        
        if (parsingResults.error) {
          endResult.errors.push(parsingResults.error);
        }

        if (parsingResults.result) {
          endResult.results.push(parsingResults.result);
        }
        
        asyncCallback(null, endResult);
      })}, function(err, endResult) {
        endResult.results = _.flatten(endResult.results);
        callback(err, endResult);
      });
    });
};

function parseFile(file, callback) {
  fs.readFile(file, 'utf-8', function(err, content) {
    if (err) {
      return callback(err);
    }

    try {
      callback(null, splice(parse(content)));
    }
    catch(error) {
      callback(null, null, error);
    }
  });
}

function handleParsingResults(file, nodes, parsingError, callback) {
  if (parsingError) {
    console.log('Error in file: ', file.red, '. Check the output file');
    
    var error = {
      file: file,
      error: parsingError
    };
    
    return {
      error: error
    };
  }

  if (nodes && nodes.length > 0) {
    _.each(nodes, function(node) {
      node.file = file;
    });
    
    console.log('Parsed file: ', file.green);
    return {
      result: nodes
    };
  }
}
