'use strict';
module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define('Skill', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
  }, rating: {
      type: DataTypes.INTEGER,
      allowNull: false
  }
  }, {});

  return Skill;
};