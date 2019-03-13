'use strict';
const supertest = require('supertest');
const TestServer = require('./testServer');

/**
 * @function getSuperTestInstance
 * @param {Function} routesFn - express routes function
 * @param {string} urlBase - base url to use for test
 * @return {Object} instance of supertest object
 */
function getSuperTestInstance(routesFn, urlBase) {
    const app = TestServer.getApp();
  
    routesFn(models, app, urlBase);
  
    // TestServer.setErrorHandlers(app);
  
    return supertest(app);
  }

module.exports = Object.freeze({
    getSuperTestInstance,
});