"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First create the quiz
    await queryInterface.bulkInsert("quizzes", [
      {
        id: 1,
        title: "Sky Quiz",
        description: "A quiz about why the sky is blue",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // Then create the questions
    await queryInterface.bulkInsert("questions", [
      {
        id: 1,
        quiz_id: 1,
        question: "Why is the sky blue? (short answer)",
        type: "short_answer",
        correct_answer: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        quiz_id: 1,
        question: "Which of these best explains why the sky appears blue?",
        type: "multiple_choice",
        correct_answer: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        quiz_id: 1,
        question:
          "Select all factors that contribute to the sky appearing blue:",
        type: "multiple_selection_choice",
        correct_answer: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        quiz_id: 1,
        question: "Explain in detail why the sky appears blue during daytime.",
        type: "long_text",
        correct_answer: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        quiz_id: 1,
        question:
          "The sky appears blue due to a phenomenon called Rayleigh scattering, where sunlight is scattered by air molecules in the atmosphere. Blue light is scattered more than other colors because it travels in shorter wavelengths.",
        type: "description",
        correct_answer: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        quiz_id: 1,
        question: "The sky always appears blue during a clear day.",
        type: "true_false",
        correct_answer: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // Finally create the answers
    await queryInterface.bulkInsert("answers", [
      // Answers for multiple choice question (id: 2)
      {
        id: 1,
        question_id: 2,
        answer_text: "The ocean reflects its color to the sky",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        question_id: 2,
        answer_text: "Rayleigh scattering of sunlight by air molecules",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        question_id: 2,
        answer_text: "Blue paint on the atmosphere",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        question_id: 2,
        answer_text: "It's just an optical illusion",
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Answers for multiple selection question (id: 3)
      {
        id: 5,
        question_id: 3,
        answer_text: "Atmospheric molecules",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        question_id: 3,
        answer_text: "Sunlight wavelengths",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 7,
        question_id: 3,
        answer_text: "Scattered light particles",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 8,
        question_id: 3,
        answer_text: "Air density",
        created_at: new Date(),
        updated_at: new Date(),
      },
      // Answers for true/false question (id: 6)
      {
        id: 9,
        question_id: 6,
        answer_text: "True",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 10,
        question_id: 6,
        answer_text: "False",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove in reverse order of creation
    await queryInterface.bulkDelete("answers", null, {});
    await queryInterface.bulkDelete("questions", null, {});
    await queryInterface.bulkDelete("quizzes", null, {});
  },
};
