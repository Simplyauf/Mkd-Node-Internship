"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      if (models.Transaction) {
        this.hasMany(models.Transaction, {
          foreignKey: "order_id",
        });
      }
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      tax: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      notes: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // 0 for not paid, 1 for paid
        validate: {
          isIn: [[0, 1]],
        },
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
      underscored: true,
    }
  );

  return Order;
};
