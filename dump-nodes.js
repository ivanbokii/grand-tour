var extractNodes = require('./lib');
var parse = require('minimist');
var _ = require('lodash');
var fs = require('fs');
var colors = require('colors');

var parsedArgs = parse(process.argv.slice(2));

if (!parsedArgs.route || !parsedArgs.output) {
  console.log('Usage'.yellow, ': dump-nodes --route ', '[route to the project]'.green, ' --output ', '[path to the output file]'.green);
  return;
}

extractNodes(parsedArgs.route, function(err, results) {
  if (err) {
    console.log('Something went wrong: '.red, err);
    return;
  }

  var content = JSON.stringify(results, '', 2);
  fs.writeFileSync(parsedArgs.output, content);
  console.log('Done');
});
