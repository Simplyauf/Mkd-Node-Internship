"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      this.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "order",
      });
      this.belongsTo(models.ShippingDock, {
        foreignKey: "shipping_dock_id",
        as: "shipping_dock",
      });
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
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
        references: {
          model: "users",
          key: "id",
        },
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
      notes: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Transaction",
      tableName: "transactions",
      underscored: true,
      timestamps: true,
    }
  );

  return Transaction;
};
