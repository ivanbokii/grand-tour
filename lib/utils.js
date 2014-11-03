exports.canReadCallExpression = function(callExpression) {
  return callExpression &&
    callExpression.callee &&
    callExpression.callee.object &&
    callExpression.callee.property;
}

exports.isCharabancRegisterOrRequest = function(callExpression) {
  var callObject = callExpression.callee.object;
  var callProperty = callExpression.callee.property;

  return callObject.name === 'charabanc' &&
    (callProperty.name === 'request' ||
    callProperty.name === 'register');
}

exports.canFetchArguments = function(callExpression) {
  return callExpression.arguments;
}
