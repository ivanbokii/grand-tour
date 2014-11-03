//root level
charabanc.request('mochaccino', function() {});

//in a property of an object
var someObject = {
  prop: function() {
    charabanc.request('latte', function() {});
  }
};

//in a property of an object
someObject.anotherProp = function() {
  charabanc.request('icedcoffee', function() {});
}

//in a callback as a parameter to a function call
someObject.func('arg1', function() {
  charabanc.request('cappuccino', function() {});
});

//in nested callbacks
someObject.func('something', function() {
  someObject.anotherFunc('another', function() {
    charabanc.request('espressino', function() {});
  });
});

//nested requests in the same context
someObject.func('arg1', function() {
  charabanc.request('redeye', function() {
    charabanc.request('irishcoffee', function() {});
  });
});

//in a charabanc register's callback
charabanc.register('pocillo', function() {
  charabanc.request('macchiato', function() {});
});
