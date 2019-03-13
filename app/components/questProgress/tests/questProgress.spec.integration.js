'use strict';

const TestHelper = require('./../../../shared/testHelper');
const routes = require('./../questProgress.routes');

describe('Advertisement integration tests', () => {
    const sandbox = sinon.createSandbox();
    const apiBase = '/api'
    const url = `/progress`;
    let request;
    let data;

    beforeEach(function() {
      data = {
        playerId: '1',
        playerLevel: 1,
        chipAmountBet: '100'
      }

      request = TestHelper.getSuperTestInstance(routes, apiBase);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('POST api/progress', function () {
      it('should return 200 with json response', function (done) {
        request.post(url)
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(data))
            .expect(200)
            .end(done);
      });
    });
});