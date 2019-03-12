'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('player_scores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      currentLevel: {
        type: Sequelize.INTEGER,
        field: 'current_level',
        allowNull: false
      },
      pointsEarned: {
        type: Sequelize.INTEGER,
        field: 'points_earned',
        allowNull: false
      },
      lastMilestoneIndex: {
        type: Sequelize.INTEGER,
        field: 'last_milestone_index',
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      deleted_at: Sequelize.DATE,
    });
  },
  
  down: function(queryInterface) {
    return queryInterface.dropTable('player_scores');
  },
};
