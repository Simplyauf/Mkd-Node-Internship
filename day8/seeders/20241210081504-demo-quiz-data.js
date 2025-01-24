"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, create a quiz
    const quiz = await queryInterface.bulkInsert(
      "quizzes",
      [
        {
          title: "General Knowledge Quiz",
          description: "Test your general knowledge!",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { returning: true }
    );

    // Create questions
    const questions = await queryInterface.bulkInsert(
      "questions",
      [
        {
          quiz_id: 1,
          question: "What is the capital of France?",
          type: "multiple_choice",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          quiz_id: 1,
          question: "Explain why the sky is blue",
          type: "long_text",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          quiz_id: 1,
          question: "Is the Earth flat?",
          type: "true_false",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { returning: true }
    );

    // Create answers for the multiple choice question
    await queryInterface.bulkInsert("answers", [
      {
        question_id: 1,
        answer: "Paris",
        is_correct: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_id: 1,
        answer: "London",
        is_correct: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_id: 1,
        answer: "Berlin",
        is_correct: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        question_id: 3,
        answer: "False",
        is_correct: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all the data
    await queryInterface.bulkDelete("answers", null, {});
    await queryInterface.bulkDelete("questions", null, {});
    await queryInterface.bulkDelete("quizzes", null, {});
  },
};
