'use strict';
const AppCtrl = require('./app/shared/appController');
const API_BASE = '/api';
const path = require('path');
const API_RESPONSES = require('./app/shared/apiResponses.constants');

module.exports = (app, models) => {
  const mountRoute = (route) => {
    return require(path.resolve(__dirname, 'app/components', route))(models, app, API_BASE);
  };

  mountRoute('questProgress/questProgress.routes');
  mountRoute('questState/questState.routes');

  // Respond with 404 for all other routes
  app.use((req, res, next) => {
    if (!res.headersSent) {
      const category = 'general';
      const type = 'notFound';
      const {status: statusCode} = API_RESPONSES[category][type];
      const contentType = res.getHeader('content-type');
      return AppCtrl.sendResponse(res, statusCode, contentType, type);
    }

    next();
  });
};
