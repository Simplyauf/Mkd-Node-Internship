"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      this.belongsTo(models.Order, { foreignKey: "order_id" });
      this.belongsTo(models.ShippingDock, {
        foreignKey: "shipping_dock_id",
      });
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
        references: {
          model: "orders",
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      shipping_dock_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "shipping_docks",
          key: "id",
        },
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      notes: {
        type: DataTypes.TEXT,
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
