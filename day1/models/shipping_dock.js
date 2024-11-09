"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ShippingDock extends Model {
    static associate(models) {
      if (models.Transaction) {
        this.hasMany(models.Transaction, {
          foreignKey: "shipping_dock_id",
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
        validate: {
          isIn: {
            args: [[0, 1]],
            msg: "Status must be either 0 or 1",
          },
        },
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
