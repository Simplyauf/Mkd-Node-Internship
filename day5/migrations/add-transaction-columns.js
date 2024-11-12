"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("transactions", "discount", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    });

    await queryInterface.addColumn("transactions", "tax", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    });

    await queryInterface.addColumn("transactions", "total", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    });

    await queryInterface.addColumn("transactions", "status", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "0: not paid, 1: paid",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("transactions", "discount");
    await queryInterface.removeColumn("transactions", "tax");
    await queryInterface.removeColumn("transactions", "total");
    await queryInterface.removeColumn("transactions", "status");
  },
};
