"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    static associate(models) {
      this.hasMany(models.Question, {
        foreignKey: "quiz_id",
        as: "questions",
      });
    }
  }

  Quiz.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Quiz",
      tableName: "quizzes",
      underscored: true,
    }
  );

  return Quiz;
};
