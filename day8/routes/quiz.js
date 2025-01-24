const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", async (req, res) => {
  try {
    const quiz = await db.Quiz.findOne({
      include: [
        {
          model: db.Question,
          as: "questions",
          include: [
            {
              model: db.Answer,
              as: "answers",
            },
          ],
        },
      ],
    });

    if (!quiz) {
      return res.status(404).json({ error: "No quiz found" });
    }

    const formattedQuiz = quiz.questions.map((q) => ({
      id: q.id,
      type: q.type,
      question: q.question,
      answers: q.answers.map((a) => ({
        id: a.id,
        answer: a.answer,
      })),
      correct_answer: q.answers.find((a) => a.is_correct)?.id || 0,
    }));

    res.json(formattedQuiz);
  } catch (error) {
    console.error("Quiz fetch error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
