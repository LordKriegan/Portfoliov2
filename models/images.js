'use strict';
module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define('Images', {
    imageLink: {
      type: DataTypes.STRING,
      allowNull: false
  }
  }, {});
  Images.associate = function(models) {
    models.Images.belongsTo(models.Project, {
      foreignKey: {
          allowNull: false
      }
  });
  };
  return Images;
};