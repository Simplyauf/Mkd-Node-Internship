"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      if (models.Transaction) {
        this.hasMany(models.Transaction, {
          foreignKey: "order_id",
          as: "transactions",
        });
      }
      if (models.User) {
        this.belongsTo(models.User, {
          foreignKey: "user_id",
          as: "user",
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
        defaultValue: 0,
      },
      notes: DataTypes.TEXT,
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
        comment: "1: paid, 2: not_paid",
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
