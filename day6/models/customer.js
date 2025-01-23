"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      // define associations here if needed
    }
  }

  Customer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      shopify_customer_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      shopify_customer_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Customer",
      tableName: "customers",
      underscored: true,
    }
  );

  return Customer;
};
