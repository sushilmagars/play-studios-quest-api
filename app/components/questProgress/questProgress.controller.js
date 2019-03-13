'use strict';
const {
  rateFromBet: RATE_FROM_BET,
  levelBonusRate: LEVEL_BONUS_RATE,
} = require('./../../shared/quests').quests;
const AppCtrl = require('./../../shared/appController');
const {quests: QUESTS} = require('./../../shared/quests');
const API_RESPONSES = require('./../../shared/apiResponses.constants');

/**
 * Controller for Quest progress routes
 */
class QuestProgressCtrl {
  /**
   * Accepts
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - executes next middleware
   */
  static async updatePlayerProgress(req, res, next) {
    const playerId = Number(_.get(req.body, 'playerId'));
    const playerLevel = Number(_.get(req.body, 'playerLevel'));
    const chipAmountBet = Number(_.get(req.body, 'chipAmountBet'));

    try {
      // get total quest points of the player
      const playerScore = await models.PlayerScore.findByPk(playerId);
      const currentQuestTotalPoints = playerScore.pointsEarned;

      // calculate new points and add them to total quest points
      const newQuestPointsEarned = this.calculateNewPoints(playerLevel, chipAmountBet);

      // calculate new quest points earned
      const pointsEarned = currentQuestTotalPoints + newQuestPointsEarned;

      // check if new milestone is reached
      const milestone = this.newlyReachedMilestone(playerScore.lastMilestoneIndex, pointsEarned);

      // update database with new points and new milestone index
      const milestoneIndex = _.get(milestone, 'milestoneIndex', playerScore.lastMilestoneIndex);
      const scoreUpdatedResult = await this.updateNewScore(playerId, pointsEarned, milestoneIndex);

      // milestone based on latest player quest points
      const lastMilestoneIndex = scoreUpdatedResult[1].lastMilestoneIndex
      const numberOfMilestones = QUESTS.milestones.length;
      const totalQuestPercentCompleted = Number.parseInt((100 * lastMilestoneIndex) / numberOfMilestones);

      // new chips awarded based on milestone completion
      const newChipsAwarded = _.get(milestone, 'chipsAwarded', 0);

      const content = {
        'QuestPointsEarned': pointsEarned,
        'TotalQuestPercentCompleted': totalQuestPercentCompleted,
        'MilestonesCompleted': [{
          'MilestoneIndex': milestoneIndex, 
          'ChipsAwarded': newChipsAwarded,
        }]
      };

      return this.sendResponse(res, content, 'general', 'success');
    } catch (err) {
      return this.handleErrorResponse(err, res, next)
    }
  }

  /**
   * newlyReachedMilestone
   * @function newlyReachedMilestone
   * @memberof QuestProgressCtrl
   * @param {Number} lastMilestoneIndex
   * @param {Number} pointsEarned
   * @param {object} milestone
   */
  static newlyReachedMilestone(lastMilestoneIndex, pointsEarned) {
    const milestones = QUESTS.milestones;
    
    for (let i = 0; i < milestones.length; i++) {
      if (pointsEarned >= milestones[i].pointsNeededToComplete && milestones[i].milestoneIndex > lastMilestoneIndex) {
        return milestones[i];
      }
    }
  }

  /**
   * calculateNewPoints
   * @function calculateNewPoints
   * @memberof QuestProgressCtrl
   * @param {Number} playerLevel
   * @param {Number} chipAmountBet
   * @param {Number} quest points calculated
   */
  static calculateNewPoints(playerLevel, chipAmountBet) {
    return (chipAmountBet * RATE_FROM_BET) + (playerLevel * LEVEL_BONUS_RATE);
  }

  /**
   * updateNewScore
   * @function updateNewScore
   * @memberof QuestProgressCtrl
   * @param {Number} playerId
   * @param {Number} pointsEarned
   * @param {Number} lastMilestoneIndex
   * @param {Object} Player model instance
   */
  static async updateNewScore(playerId, pointsEarned, lastMilestoneIndex) {
    return await models.PlayerScore.update({pointsEarned, lastMilestoneIndex}, {
      where: {id: playerId}, 
      returning: true,
      plain: true
    });
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
  handleErrorResponse(res, err) {
    const statusCode = err.statusCode;
    const content = err.message;
    const contentType = res.getHeader('content-type');
    return AppCtrl.handleErrorResponse(res, statusCode, contentType, content);
  }
}

module.exports = QuestProgressCtrl;