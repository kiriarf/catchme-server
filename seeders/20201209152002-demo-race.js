"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Races",
      [
        {
          distance: 2000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          distance: 3000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Races", null, {});
  },
};
