'use strict';
const Sequelize = require('sequelize');
const chai = require('chai');
const sinon = require('sinon');

// load models
const {
  database,
  username: dbUsername,
  password: dbPassword,
  define: sequelizeDefine,
  ...dbConfig
} = require('./../config/sequelize.json')['development'];

const sequelize = new Sequelize(database, dbUsername, dbPassword, {
  ...dbConfig,
  define: {
    ...sequelizeDefine
  },
});

global.models = require('./../database')(sequelize, Sequelize);

// Load Chai assertions
chai.use(require('chai-as-promised'));

global.expect = chai.expect;
global.assert = chai.assert;
global.should = chai.should();

// Load Sinon
global.sinon = sinon;