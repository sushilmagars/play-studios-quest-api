'use strict';
const {quests: QUESTS} = require('./../../../shared/quests');
const QuestProgressCtrl = require('./../questProgress.controller');

describe('Quest progress controller tests', () => {
  describe('#newlyReachedMilestone', () => {
    it('should return new milestone', () => {
      const newPoints = 1000;
      const lastMilestoneIndex = 0;
      const expected = {
        pointsNeededToComplete: 1000,
        milestoneIndex: 1,
        chipsAwarded: 100
      };

      const milestone = QuestProgressCtrl.newlyReachedMilestone(lastMilestoneIndex, newPoints);
      expect(milestone).to.deep.equal(expected);
    });

    it('should not return new milestone when milestone is not reached', () => {
      const newPoints = 199;
      const lastMilestoneIndex = 0;

      const milestone = QuestProgressCtrl.newlyReachedMilestone(lastMilestoneIndex, newPoints);
      expect(milestone).to.be.equal(undefined);
    });

    it('should not return new milestone if milestone is reached', () => {
      const newPoints = 1300;
      const lastMilestoneIndex = 1;

      const milestone = QuestProgressCtrl.newlyReachedMilestone(lastMilestoneIndex, newPoints);
      expect(milestone).to.be.equal(undefined);
    });
  });
});