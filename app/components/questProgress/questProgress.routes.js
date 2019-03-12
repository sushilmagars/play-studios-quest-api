'use strict';
const QuestProgressCtrl = require('./questProgress.controller');
const router = require('express').Router();
const {check} = require('express-validator/check');
const {validateRequestParams} = require('./questProgress.middleware');

module.exports = (models, app, API_BASE) => {
  const controller = new QuestProgressCtrl(models);
  _.bindAll(controller, Object.getOwnPropertyNames(QuestProgressCtrl.prototype));

  app.use(`${API_BASE}/progress`, router);

  router.post('/',
    [
      check('playerId')
        .exists({checkNull: true}).withMessage('Player id must be provided.')
        .isLength({ min: 1 }).withMessage('Player id should of at least length 1')
        .isString().withMessage('Player id must be a string.'),
      check('playerLevel')
        .exists().withMessage('Player level must be provided.')
        .isInt().withMessage('Player level should be an integer'),
      check('chipAmountBet')
        .exists().withMessage('Chip amount bet must be provided.')
        .isInt().withMessage('Chip amount bet must be an integer.'),
    ],
    validateRequestParams,
    controller.updatePlayerProgress
  );
};
