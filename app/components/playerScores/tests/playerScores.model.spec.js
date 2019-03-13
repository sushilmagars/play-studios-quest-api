'use strict';

const Player = models.PlayerScore;

describe('Player score model tests', () => {
  let scoreObj;

  beforeEach(() => {
    scoreObj = {
      id: 1,
      name: 'Sushil Magar',
      pointsEarned: 180,
      lastMilestoneIndex: 0
    };
  });

  describe('Model validations', () => {
    it('should be valid valid properties', () => {
      const newPlayerScore = new Player(scoreObj);
      
      newPlayerScore
        .validate()
        .should.be.fulfilled;
    });

    it('should not be valid without a player name', (done) => {
      scoreObj.name = null;
      const newPlayerScore = new Player(scoreObj);
      
      newPlayerScore
        .validate()
        .should.be.rejected
        .then((validationResult) => {
          validationResult.should.have.property('name', 'SequelizeValidationError');
          validationResult.should.have.nested.property('errors[0].message', 'PlayerScore.name cannot be null');
          done();
        })
        .catch(done);
    });

    it('should not allow integer values for name field', (done) => {
      scoreObj.name = 123;
      const newPlayerScore = new Player(scoreObj);

      newPlayerScore
        .validate()
        .should.be.rejected.and.eventually.have.property('name', 'SequelizeValidationError').notify(done);
    });

    it('should not allow null values for points earned', (done) => {
      scoreObj.pointsEarned = null;
      const newPlayerScore = new Player(scoreObj);
      
      newPlayerScore
        .validate()
        .should.be.rejected.and.eventually.have.property('name', 'SequelizeValidationError').and.notify(done);
    });

    it('should not allow null value for lastMilestoneIndex', (done) => {
      scoreObj.pointsEarned = null;
      const newPlayerScore = new Player(scoreObj);
      
      newPlayerScore
        .validate()
        .should.be.rejected.and.eventually.have.property('name', 'SequelizeValidationError').and.notify(done);
    });
  });
});


