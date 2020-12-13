module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Races', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      distance: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      startTime: {
        type: Sequelize.FLOAT,
      },
      endTime: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('Races');
  },
};
