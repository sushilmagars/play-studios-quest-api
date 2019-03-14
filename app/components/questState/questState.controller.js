'use strict';
const AppCtrl = require('../../shared/appController.js');
const API_RESPONSES = require('./../../shared/apiResponses.constants');
const {quests: QUESTS} = require('./../../shared/quests');
const _ = require('lodash');

/**
 * Controller for quest state routes
 */
class QuestCtrl {
  /**
   * Fetches current quest state of a player
   * @function {function} - fetchPlayerQuestState
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - executes next middleware
   */
  fetchPlayerQuestState(req, res, next) {
    const playerId = req.params.id;

    return models.PlayerScore.findByPk(playerId)
      .then((score) => {
        const content = this.handleSuccessResponse(score);

        if (content) {
          return this.sendResponse(res, content, 'general', 'success');
        }

        return this.sendResponse(res, [], 'general', 'scoreNotAvailable');
      })
      .catch((err) => this.handleErrorResponse(err, res, next));
  }

  /**
   * Builds response object
   * @function handleSuccessResponse
   * @memberof QuestProgressCtrl
   * @param {Object} res
   * @param {*} content
   * @param {String} category
   * @param {String} type
   */
  handleSuccessResponse(score) {
    if (!score) {
      return null;
    }

    const lastMilestoneIndex = score.lastMilestoneIndex;
    const numberOfMilestones = QUESTS.milestones.length;
    const milestoneCompletion = Number((100 * lastMilestoneIndex) / numberOfMilestones).toFixed(1);
    
    return {
      'TotalQuestPercentCompleted': milestoneCompletion, 
      'LastMilestoneIndexCompleted': lastMilestoneIndex
    };
  }

  /**
   * Alias for static sendResponse so we can call this as an instance method or static
   * @function sendResponse
   * @memberof QuestProgressCtrl
   * @param {Object} res
   * @param {*} content
   * @param {String} category
   * @param {String} type
   */
  sendResponse(res, content, category, type) {
    const {status: statusCode} = API_RESPONSES[category][type];
    const contentType = res.getHeader('content-type');
    return AppCtrl.sendResponse(res, statusCode, contentType, content);
  }
  
  /**
   * Helper function to be used as controller route catch blocks.
   *
   * @function handleErrorResponse
   * @memberof QuestProgressCtrl
   * @param {Object} res - Express http response object
   * @param {Object} err - error object
   */
  handleErrorResponse(err, res) {
      const statusCode = err.statusCode;
      const content = err.message;
      const contentType = res.getHeader('content-type');
      return AppCtrl.handleErrorResponse(res, statusCode, contentType, content);
  }
}

module.exports = QuestCtrl;
