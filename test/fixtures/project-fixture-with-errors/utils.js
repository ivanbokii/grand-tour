var charabanc = require('charabanc');
var utils = {};

utils.init = function() {
  charabanc.register('dump-info', function(info) {
    //dump info
  });
};

module.exports = utils;
