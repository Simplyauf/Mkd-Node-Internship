"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      this.belongsTo(models.Quiz, {
        foreignKey: "quiz_id",
        as: "quiz",
      });
      this.hasMany(models.Answer, {
        foreignKey: "question_id",
        as: "answers",
      });
    }
  }

  Question.init(
    {
      question: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      quiz_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(
          "short_answer",
          "multiple_choice",
          "multiple_selection_choice",
          "long_text",
          "description",
          "true_false"
        ),
        allowNull: false,
      },
      correct_answer: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Question",
      tableName: "questions",
      underscored: true,
    }
  );

  return Question;
};
