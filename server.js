'use strict';
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

// App modules
const app = express();
const routes = require('./routes');

module.exports = (models) => {
  app.use(bodyParser.json());
  
  // allow cross origin
  app.use(cors());

  // assign routes
  routes(app, models);
  
  return app;
};
