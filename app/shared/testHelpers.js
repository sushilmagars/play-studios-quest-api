'use strict';
const app = require('../..');
const supertest = require('supertest');

function getSuperInstance() {
    return supertest(app);
}

module.exports = Object.freeze({
    getSuperInstance,
});