"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First rename createdAt to created_at
    await queryInterface.renameColumn("answers", "createdAt", "created_at");
    // Then rename updatedAt to updated_at
    await queryInterface.renameColumn("answers", "updatedAt", "updated_at");
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the changes if needed
    await queryInterface.renameColumn("answers", "created_at", "createdAt");
    await queryInterface.renameColumn("answers", "updated_at", "updatedAt");
  },
};
