module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Races',
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
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Races', null, {}),
};
