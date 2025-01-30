"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fix quizzes table
    await queryInterface.renameColumn("quizzes", "createdAt", "created_at");
    await queryInterface.renameColumn("quizzes", "updatedAt", "updated_at");

    // Fix questions table
    await queryInterface.renameColumn("questions", "createdAt", "created_at");
    await queryInterface.renameColumn("questions", "updatedAt", "updated_at");
  },

  down: async (queryInterface, Sequelize) => {
    // Revert quizzes table
    await queryInterface.renameColumn("quizzes", "created_at", "createdAt");
    await queryInterface.renameColumn("quizzes", "updated_at", "updatedAt");

    // Revert questions table
    await queryInterface.renameColumn("questions", "created_at", "createdAt");
    await queryInterface.renameColumn("questions", "updated_at", "updatedAt");
  },
};
