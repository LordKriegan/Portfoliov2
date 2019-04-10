'use strict';
module.exports = (sequelize, DataTypes) => {
  const WorkHistory = sequelize.define('WorkHistory', {
    employer: {
      type: DataTypes.STRING,
      allowNull: false
  }, yearStart: {
      type: DataTypes.INTEGER,
      allowNull: false
  }, yearEnd: {
      type: DataTypes.INTEGER
  }, title: {
      type: DataTypes.STRING
  }
  }, {});

  return WorkHistory;
};