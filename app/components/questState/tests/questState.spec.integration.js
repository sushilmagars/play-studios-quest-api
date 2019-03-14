'use strict';

const TestHelper = require('./../../../shared/testHelper');
const routes = require('./../questState.routes');
const QuestStateCtrl = require('./../questState.controller');

describe('Quest State integration tests', () => {
    const sandbox = sinon.createSandbox();
    const apiBase = '/api';
    const url = '/state';
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
      request = TestHelper.getSuperTestInstance(routes, apiBase);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('GET api/state', function () {
      it('should return 200 with json response', function (done) {
        const testData = {
          playerId: '1',
          playerLevel: 1,
          chipAmountBet: 100
        };
        stubs.findByPk.resolves(playerData);

        request.get(`${apiBase}${url}/${testData.playerId}`)
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(done);
      });

      it('should return 404 on bad player id', function (done) {
        request.get(`${apiBase}${url}/stringPlayerId`)
            .set('Content-Type', 'application/json')
            .expect(400)
            .end(done);
      });

      it('should return 200 with json response', function (done) {
        const testData = {playerId: '1',
          playerLevel: 1,
          chipAmountBet: 100
        };
        stubs.findByPk.resolves(playerData[0]);

        request.get(`${apiBase}${url}/${testData.playerId}`)
            .set('Content-Type', 'application/json')
            .expect(200)
            .expect((res) => {
              expect(res.body).to.have.property('TotalQuestPercentCompleted', '0.0');
              expect(res.body).to.have.property('LastMilestoneIndexCompleted', 0);
            })
            .end(done);
      });
    });
});