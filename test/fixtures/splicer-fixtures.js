someObject.func('arg1', function() {
  charabanc.register('ripley', function() {
    console.log('hello world');
    charabanc.request('ash', function() {
      console.log('who is John Doe?');
      charabanc.request('parker', function() {});
    });
  });
});

someObject.property = function() {
  async.parallel([
    function(callback) {
      charabanc.request('hello', callback);
    },
    function(callback) {
      charabanc.request('world', callback);
    }
  ], function(err, results) {});
}
