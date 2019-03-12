'use strict';

function isParamIntValidator(field) {
  return function(req, res, next) {
    const msg = `${field} must be an integer`;
    
    next();
  }
}

module.exports = {
  url: {
    validatePlayerId: isParamIntValidator('id'),
  }
}