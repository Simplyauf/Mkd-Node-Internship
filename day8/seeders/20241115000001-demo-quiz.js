"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert quiz
    const quiz = await queryInterface.bulkInsert(
      "quizzes",
      [
        {
          title: "Sample Quiz",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { returning: true }
    );

    // Insert questions
    const questions = await queryInterface.bulkInsert(
      "questions",
      [
        {
          quiz_id: 1,
          question: "What is 2 + 2?",
          type: "multiple_choice",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          quiz_id: 1,
          question: "Is the sky blue?",
          type: "true_false",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { returning: true }
    );

    // Insert answers
    await queryInterface.bulkInsert("answers", [
      {
        question_id: 1,
        answer: "3",
        is_correct: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_id: 1,
        answer: "4",
        is_correct: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_id: 2,
        answer: "True",
        is_correct: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_id: 2,
        answer: "False",
        is_correct: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("answers", null, {});
    await queryInterface.bulkDelete("questions", null, {});
    await queryInterface.bulkDelete("quizzes", null, {});
  },
};
