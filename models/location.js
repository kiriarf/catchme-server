const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Location.belongsTo(models.User, { foreignKey: 'UserId' });
    }
  }
  Location.init(
    {
      startLat: DataTypes.FLOAT,
      startLong: DataTypes.FLOAT,
      endLat: DataTypes.FLOAT,
      endLong: DataTypes.FLOAT,
      distance: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Location',
    },
  );
  return Location;
};
