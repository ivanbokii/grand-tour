var charabanc = require('charabanc');
var users = {};

users.init = function() {
  charabanc.register('users-info', function() {
    charabanc.request('get-users-account-info', function() {
      //return users with accounts
    });
  });
};

module.exports = users;

return 'error';
