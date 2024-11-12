"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Email extends Model {
    static associate(models) {
      this.hasMany(models.EmailQueue, {
        foreignKey: "email_id",
        as: "email_queues",
      });
    }
  }

  Email.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: "1: active, 0: inactive",
      },
    },
    {
      sequelize,
      modelName: "Email",
      tableName: "emails",
      underscored: true,
    }
  );

  return Email;
};
