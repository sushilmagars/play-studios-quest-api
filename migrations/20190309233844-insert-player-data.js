'use strict';
const TABLE = 'player_scores';
const TABLE_DATA = [
  {
    name: 'Sushil Magar',
    current_level: 1,
    points_earned: 100,
    last_milestone_index: 2,
  },
  {
    name: 'Sam Allardyce',
    current_level: 0,
    points_earned: 600,
    last_milestone_index: 1,
  },
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(TABLE, TABLE_DATA);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(TABLE, [{[Sequelize.Op.or]: TABLE_DATA}]);
  }
};
