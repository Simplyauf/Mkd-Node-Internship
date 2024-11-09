"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ShippingDock extends Model {
    static associate(models) {
      if (models.Transaction) {
        this.hasMany(models.Transaction, {
          foreignKey: "shipping_dock_id",
          as: "transactions",
        });
      }
    }
  }

  ShippingDock.init(
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
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: "1: active, 2: inactive",
      },
    },
    {
      sequelize,
      modelName: "ShippingDock",
      tableName: "shipping_docks",
      underscored: true,
    }
  );

  return ShippingDock;
};
