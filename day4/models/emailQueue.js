const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class EmailQueue extends Model {
    static associate(models) {
      this.belongsTo(models.Email, {
        foreignKey: "email_id",
        as: "email",
      });
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }

  EmailQueue.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "0: not sent, 1: sent",
      },
      send_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "EmailQueue",
      tableName: "email_queues",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return EmailQueue;
};
