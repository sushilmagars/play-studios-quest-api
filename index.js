'use strict';

require('dotenv').config({silent: true});
const Sequelize = require('sequelize');
const _ = require('lodash');
const http = require('http');

const PORT = '8080';
const {
  database,
  username: dbUsername,
  password: dbPassword,
  define: sequelizeDefine,
  ...dbConfig
} = require('./config/sequelize.json')['development'];

const sequelize = new Sequelize(database, dbUsername, dbPassword, {
  ...dbConfig,
  define: {
    ...sequelizeDefine
  },
});

global.models = require('./database')(sequelize, Sequelize);
global._ = _;
const app = require('./server')(global.models);
app.set('port', PORT);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);


/**
 * Event listener for HTTP server "error" event.
 * @param {object} error an error object
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  if (['EACCES', 'EADDRINUSE'].includes(error.code)) {
    process.exit(1);
  }

  throw error;
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  console.log('Listening on ' + PORT);
}