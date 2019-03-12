'use strict';
const ModelFields = require('../../shared/modelFields');

module.exports = function(sequelize, DataTypes) {
  const name = 'PlayerScore';

  const attributes = {
    id: ModelFields.pk(),
    name: {
      type: DataTypes.STRING,
    },
    pointsEarned: {
      type: DataTypes.INTEGER,
      field: 'points_earned',
      allowNull: false
    },
    lastMilestoneIndex: {
      type: DataTypes.INTEGER,
      field: 'last_milestone_index',
      allowNull: false
    },
  };

  const options = {
    underscored: true,
    underscoredAll: true,
    paranoid: true,
    indexes: [],
  };

  const PlayerScore = sequelize.define(name, attributes, options);
  return PlayerScore;
};
