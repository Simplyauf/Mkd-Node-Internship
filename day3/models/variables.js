module.exports = (sequelize, DataTypes) => {
  const variables = sequelize.define(
    "variables",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      type: {
        type: DataTypes.ENUM("STRING", "FLOAT", "INTEGER"),
        allowNull: false,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: "variables",
    }
  );

  return variables;
};
