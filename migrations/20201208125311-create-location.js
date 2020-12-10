module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      startLat: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      startLong: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      endLat: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      endLong: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      distance: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      UserId: {
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
    await queryInterface.dropTable('Locations');
  },
};
