"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      if (models.Order) {
        this.hasMany(models.Order, {
          foreignKey: "user_id",
          as: "orders",
        });
      }
      if (models.Transaction) {
        this.hasMany(models.Transaction, {
          foreignKey: "user_id",
          as: "transactions",
        });
      }
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
      modelName: "User",
      tableName: "users",
      underscored: true,
    }
  );

  return User;
};
