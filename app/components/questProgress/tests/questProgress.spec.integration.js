'use strict';

const TestHelper = require('./../../../shared/testHelper');
const routes = require('./../questProgress.routes');
const QuestProgressCtrl = require('./../questProgress.controller');

describe('Quest Progress integration tests', () => {
    const sandbox = sinon.createSandbox();
    const apiBase = '/api'
    const url = `/progress`;
    let request;
    let playerData;
    let stubs = {};

    beforeEach(function() {
      playerData = [{
        name: 'Sam Anderson',
        pointsEarned: 760,
        lastMilestoneIndex: 0
      }];

      stubs.findByPk = sandbox.stub(models.PlayerScore, 'findByPk');
      stubs.updateScore = sandbox.stub(models.PlayerScore, 'update');
      request = TestHelper.getSuperTestInstance(routes, apiBase);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('POST api/progress', function () {
      it('should return 200 with json response', function (done) {
        const testData = {
          playerId: '1',
          playerLevel: 1,
          chipAmountBet: 100
        };
        stubs.findByPk.resolves(playerData);
        
        const updateData = {
          1: playerData[0]
        };
        stubs.updateScore.resolves(updateData);

        request.post(`${apiBase}${url}`)
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(testData))
            .expect(200)
            .end(done);
      });

      it('should return 400 on bad request', function (done) {
        const testData = {}

        request.post(`${apiBase}${url}`)
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(testData))
            .expect(400)
            .end(done);
      });

      it('should return 400 on bad request', function (done) {
        const testData = {}

        request.post(`${apiBase}${url}`)
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(testData))
            .expect(400)
            .end(done);
      });
    });
});