"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      // Add associations if needed
    }
  }

  Transaction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      shipping_dock_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      tax: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "0: not paid, 1: paid",
      },
    },
    {
      sequelize,
      modelName: "Transaction",
      tableName: "transactions",
      underscored: true,
    }
  );

  return Transaction;
};
