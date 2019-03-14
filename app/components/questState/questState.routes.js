'use strict';

const StateCtrl = require('./questState.controller');
const router = require('express').Router();
const {
  url: {
    validatePlayerId,
  }
} = require('./../../shared/validator.middleware');
const { check } = require('express-validator/check');
const {validateRequestParams} = require('./questState.middleware');
const _ = require('lodash');

module.exports = (models, app, API_BASE) => {
  const controller = new StateCtrl(models);
  _.bindAll(controller, Object.getOwnPropertyNames(StateCtrl.prototype));

  app.use(`${API_BASE}/state`, router);

  router.get('/:id',
    [check('id').isInt().withMessage(`Player id should be an integer.`)],
    validateRequestParams,
    controller.fetchPlayerQuestState
  );
};
