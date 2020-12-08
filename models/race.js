"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Race extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Race.hasMany(models.User);
      Race.hasMany(models.Location);
      Race.hasMany(models.Score);
    }
  }

  Race.init(
    {
      distance: DataTypes.INTEGER,
      startTime: DataTypes.INTEGER,
      endTime: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Race",
    }
  );
  return Race;
};