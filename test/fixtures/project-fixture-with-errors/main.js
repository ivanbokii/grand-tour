var charabanc = require('charabanc');
var main = {};

main.init = function() {
  charabanc.request('users-info', function(info) {
    charabanc.request('dump-info');
  });
};

module.exports = main;
