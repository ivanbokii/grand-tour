var extractNodes = require('./lib');

extractNodes('./test/fixtures/project-fixture', function(err, results) {
  if (err) {
    console.error('Something went wrong: ', err);
    return;
  }

  console.log(JSON.stringify(results, '', 2));
});
// extractNodes('../elemez');
