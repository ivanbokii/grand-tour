var extractNodes = require('./lib');
var parse = require('minimist');
var _ = require('lodash');
var fs = require('fs');
var colors = require('colors');

var parsedArgs = parse(process.argv.slice(2));

if (!parsedArgs.route) {
  console.log('Usage'.yellow, ': dump-nodes --route ', '[route to the project]'.green);
  return;
}

extractNodes(parsedArgs.route, function(err, results) {
  if (err) {
    console.log('Something went wrong: '.red, err);
    return;
  }

  var content = JSON.stringify(results, '', 2);
  createHtml(content);
  console.log('Done');
});

function createHtml(content) {
  var html = fs.readFileSync('./web/index-template.html', 'utf8');
  var result = html.replace('##placeholder##', content);

  fs.writeFileSync('./web/index.html', result);
}
