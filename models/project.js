'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    liveLink: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ghLink: {
      type: DataTypes.STRING,
      allowNull: false
    },
    summary: {
      type: DataTypes.STRING(15000),
      allowNull: false
    },
    tech: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Project.associate = function (models) {
    models.Project.hasMany(models.Images);
  };
  return Project;
};