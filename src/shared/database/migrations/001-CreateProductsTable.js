'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('t_alfabeta', {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
      },
      id_alfabeta: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      presentation: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      effective_date: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      is_imported: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      is_refrigerated: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      troquel: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      barcodes: {
        allowNull: true,
        type: Sequelize.JSON,
      },
      iva: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      id_laboratory: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      id_sale_type: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      id_control_type_public_health: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      id_size: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      id_pharmaceutical_form: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      id_supply_way: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      id_drug: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      id_pharmaco_therapeutic_action: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      id_potency_unit: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      potency: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      id_presentation_unit: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      number_units: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      gtins: {
        allowNull: true,
        type: Sequelize.JSON,
      },
      lien_mark: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      celiac_mark: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      snomed_code: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      prospect: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      pami_porcent: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      pami_sale_price: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      sifar_mark: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      ioma_fixed_amount: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      ioma_mark: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      id_detail_drug: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      detail_drug_potency: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      id_detail_drug_potency_unit: {
        allowNull: true,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('t_alfabeta');
  },
};
