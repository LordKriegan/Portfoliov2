'use strict';
module.exports = (sequelize, DataTypes) => {
  const Education = sequelize.define('Education', {
    school: {
      type: DataTypes.STRING,
      allowNull: false
  }, yearStart: {
      type: DataTypes.INTEGER,
      allowNull: false
  }, yearEnd: {
      type: DataTypes.INTEGER
  }, degree: {
      type: DataTypes.STRING
  }
  }, {});

  return Education;
};