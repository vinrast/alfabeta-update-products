'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('t_alfabeta_base', {
      id_alfabeta: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      id_pharol: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      price: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      percentage: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('t_alfabeta_base');
  },
};
