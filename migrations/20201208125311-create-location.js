"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Locations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      startLat: {
        type: Sequelize.FLOAT,
      },
      startLong: {
        type: Sequelize.FLOAT,
      },
      endLat: {
        type: Sequelize.FLOAT,
      },
      endLong: {
        type: Sequelize.FLOAT,
      },
      distance: {
        type: Sequelize.FLOAT,
      },
      raceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Locations");
  },
};
